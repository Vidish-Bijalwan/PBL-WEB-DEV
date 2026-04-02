import { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
    value: string;
    duration?: number;
    className?: string;
}

export function AnimatedNumber({ value, duration = 1200, className }: AnimatedNumberProps) {
    const [displayValue, setDisplayValue] = useState(value);
    const [isAnimating, setIsAnimating] = useState(true);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Extract numeric part 
        const numericMatch = value.match(/[\d,.]+/);
        if (!numericMatch) {
            setDisplayValue(value);
            setIsAnimating(false);
            return;
        }

        const numStr = numericMatch[0];
        const target = parseFloat(numStr.replace(/,/g, ""));
        const prefix = value.substring(0, value.indexOf(numStr));
        const suffix = value.substring(value.indexOf(numStr) + numStr.length);
        const hasCommas = numStr.includes(",");
        const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            let formatted: string;
            if (decimals > 0) {
                formatted = current.toFixed(decimals);
            } else {
                formatted = Math.round(current).toString();
            }

            if (hasCommas) {
                const parts = formatted.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                formatted = parts.join(".");
            }

            setDisplayValue(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
                setIsAnimating(false);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return <span className={className}>{displayValue}</span>;
}
