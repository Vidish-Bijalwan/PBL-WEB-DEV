import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface SalesAnalytics {
    revenueByCategory: { category: string; amount: number }[];
    revenueByDay: { date: string; amount: number }[];
    revenueByHour: { hour: string; amount: number }[];
    totalRevenue: number;
    totalTransactions: number;
}

export const useSalesAnalytics = (range: 'today' | '7d' | '30d') => {
    const [data, setData] = useState<SalesAnalytics>({
        revenueByCategory: [],
        revenueByDay: [],
        revenueByHour: [],
        totalRevenue: 0,
        totalTransactions: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const now = new Date();
            const startDate = new Date();

            if (range === 'today') startDate.setHours(0, 0, 0, 0);
            else if (range === '7d') startDate.setDate(now.getDate() - 7);
            else if (range === '30d') startDate.setDate(now.getDate() - 30);

            const { data: txns, error } = await supabase
                .from('transactions')
                .select('*')
                .gte('created_at', startDate.toISOString())
                .neq('status', 'refund');

            if (error) {
                console.error("Error fetching sales analytics:", error);
                setLoading(false);
                return;
            }

            // Group by Category
            const catMap: Record<string, number> = {};
            const dayMap: Record<string, number> = {};
            const hourMap: Record<string, number> = {};
            let totalRev = 0;

            txns?.forEach(t => {
                const amt = Number(t.amount);
                totalRev += amt;

                // Category
                catMap[t.category] = (catMap[t.category] || 0) + amt;

                // Day
                const d = new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                dayMap[d] = (dayMap[d] || 0) + amt;

                // Hour (for today)
                if (range === 'today') {
                    const h = new Date(t.created_at).getHours();
                    const hourLabel = h >= 12 ? `${h === 12 ? 12 : h - 12}PM` : `${h}AM`;
                    hourMap[hourLabel] = (hourMap[hourLabel] || 0) + amt;
                }
            });

            setData({
                revenueByCategory: Object.entries(catMap).map(([category, amount]) => ({ category, amount })),
                revenueByDay: Object.entries(dayMap).map(([date, amount]) => ({ date, amount })),
                revenueByHour: Object.entries(hourMap).map(([hour, amount]) => ({ hour, amount })),
                totalRevenue: totalRev,
                totalTransactions: txns?.length || 0,
            });
            setLoading(false);
        };

        fetchData();
    }, [range]);

    return { data, loading };
};
