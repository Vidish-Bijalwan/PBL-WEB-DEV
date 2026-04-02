import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

export const useExport = () => {
    const { toast } = useToast();

    const exportData = async (type: string) => {
        toast({
            title: "Generating Export...",
            description: "Fetching latest data from store database.",
        });

        try {
            let query = supabase.from('transactions').select('*');

            const now = new Date();
            if (type === 'daily') {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                query = query.gte('created_at', today.toISOString());
            } else if (type === 'weekly') {
                const lastWeek = new Date();
                lastWeek.setDate(now.getDate() - 7);
                query = query.gte('created_at', lastWeek.toISOString());
            } else if (type === 'monthly') {
                const lastMonth = new Date();
                lastMonth.setMonth(now.getMonth() - 1);
                query = query.gte('created_at', lastMonth.toISOString());
            }

            const { data, error } = await query;

            if (error) throw error;
            if (!data || data.length === 0) {
                toast({ variant: "destructive", title: "Export Failed", description: "No data found for the selected range." });
                return;
            }

            // Convert to CSV
            const headers = Object.keys(data[0]).join(",");
            const rows = data.map((item: Record<string, unknown>) =>
                Object.values(item).map(val => `"${val}"`).join(",")
            );
            const csvContent = [headers, ...rows].join("\n");

            // Download
            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `retail-export-${type}-${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: "Export Ready",
                description: `Successfully exported ${data.length} records.`,
            });
        } catch (error: unknown) {
            toast({ variant: "destructive", title: "Export Failed", description: error instanceof Error ? error.message : "Unknown error" });
        }
    };

    return { exportData };
};
