import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSupabaseTable<T>(tableName: string, query?: (q: any) => any) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let q = supabase.from(tableName).select('*');
            if (query) q = query(q);

            const { data: result, error } = await q;

            if (error) setError(error);
            else setData(result || []);
            setLoading(false);
        };

        fetchData();

        // Real-time subscription
        const channel = supabase
            .channel(`${tableName}-changes`)
            .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, fetchData)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableName]);

    return { data, loading, error };
}
