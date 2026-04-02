import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
    id: string;
    amount: number;
    created_at: string;
    status: string;
    product_name?: string;
    category?: string;
    customer_name?: string;
    cashier_id?: string;
    store_id?: string;
    payment_method?: string;
}

export interface DashboardStats {
    revenue: number;
    transactions: number;
    avgTicket: number;
    growth: number;
    revenueDelta: number;
    transactionsDelta: number;
    avgTicketDelta: number;
    growthDelta: number;
}

export const useDashboardData = () => {
    const [stats, setStats] = useState<DashboardStats>({
        revenue: 0,
        transactions: 0,
        avgTicket: 0,
        growth: 0,
        revenueDelta: 0,
        transactionsDelta: 0,
        avgTicketDelta: 0,
        growthDelta: 0,
    });
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchStats = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('amount, created_at, status');

            if (error) throw error;

            if (data) {
                // Filter to today's transactions for main KPIs
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const todayTxns = data.filter(t => new Date(t.created_at) >= today && t.status !== 'refund');
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayTxns = data.filter(t => {
                    const dt = new Date(t.created_at);
                    return dt >= yesterday && dt < today && t.status !== 'refund';
                });

                const calcTotal = (txns: { amount: number }[]) => txns.reduce((acc, t) => acc + Number(t.amount), 0);

                const todayTotal = calcTotal(todayTxns);
                const yesterdayTotal = calcTotal(yesterdayTxns);

                const todayCount = todayTxns.length;
                const yesterdayCount = yesterdayTxns.length;

                const revDelta = yesterdayTotal > 0 ? ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100 : 0;
                const txnDelta = yesterdayCount > 0 ? ((todayCount - yesterdayCount) / yesterdayCount) * 100 : 0;

                setStats({
                    revenue: todayTotal,
                    transactions: todayCount,
                    avgTicket: todayCount > 0 ? todayTotal / todayCount : 0,
                    growth: revDelta, // Simplified
                    revenueDelta: Number(revDelta.toFixed(1)),
                    transactionsDelta: Number(txnDelta.toFixed(1)),
                    avgTicketDelta: 0, // Simplified
                    growthDelta: 0,
                });
            }
        } catch (error: unknown) {
            console.error('Error fetching dashboard stats:', error instanceof Error ? error.message : error);
        }
    }, []);

    const fetchRecentTransactions = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(15);

            if (error) throw error;
            setRecentTransactions(data || []);
        } catch (error: unknown) {
            console.error('Error fetching transactions:', error instanceof Error ? error.message : error);
        }
    }, []);

    useEffect(() => {
        const initFetch = async () => {
            setLoading(true);
            await Promise.all([fetchStats(), fetchRecentTransactions()]);
            setLoading(false);
        };

        initFetch();

        // Subscribe to real-time updates
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'transactions' },
                (payload) => {
                    console.log('New transaction received!', payload);
                    toast({
                        title: "New Transaction",
                        description: `${payload.new.product_name} - ₹${payload.new.amount}`,
                    });
                    fetchStats(); // Re-calculate aggregates
                    setRecentTransactions(prev => [payload.new as Transaction, ...prev].slice(0, 15));
                }
            )
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'transactions' },
                () => {
                    fetchStats();
                    fetchRecentTransactions();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchStats, fetchRecentTransactions, toast]);

    return { stats, recentTransactions, loading, refresh: () => { fetchStats(); fetchRecentTransactions(); } };
};
