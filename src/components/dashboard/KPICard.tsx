import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Receipt, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

const iconMap: Record<string, React.ElementType> = {
  "dollar-sign": DollarSign,
  "shopping-cart": ShoppingCart,
  "receipt": Receipt,
  "trending-up": TrendingUp
};

export function KPICard({ title, value, change, changeLabel, icon }: KPICardProps) {
  const Icon = iconMap[icon] || DollarSign;
  const isPositive = change >= 0;

  return (
    <Card className="border-2 border-foreground shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-chart-2" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={cn(
                  "text-sm font-semibold",
                  isPositive ? "text-chart-2" : "text-destructive"
                )}
              >
                {isPositive ? "+" : ""}{change}%
              </span>
              <span className="text-sm text-muted-foreground">{changeLabel}</span>
            </div>
          </div>
          <div className="p-3 bg-foreground">
            <Icon className="h-6 w-6 text-background" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
