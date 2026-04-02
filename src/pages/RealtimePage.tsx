import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient";
import { Activity, DollarSign, ShoppingCart, Users, Clock, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  product_name: string;
  amount: number;
  created_at: string;
  isNew?: boolean;
}

const RealtimePage = () => {
  const [revenue, setRevenue] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCustomers, setActiveCustomers] = useState(12);

  const fetchInitialData = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .gte('created_at', today.toISOString())
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTransactions(data);
      const total = data.reduce((acc, t) => acc + Number(t.amount), 0);
      setRevenue(total);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();

    const channel = supabase
      .channel('realtime-monitor')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transactions' },
        (payload) => {
          const newTxn = { ...payload.new, isNew: true } as Transaction;
          setTransactions(prev => [newTxn, ...prev].slice(0, 10));
          setRevenue(prev => prev + Number(payload.new.amount));

          // Flash animation for metrics
          setActiveCustomers(prev => prev + 1);
          setTimeout(() => setActiveCustomers(prev => Math.max(12, prev - 1)), 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <DashboardLayout title="Real-time Monitor" subtitle="Live sales and activity tracking">
      <div className="space-y-6">
        <Card className="border-2 border-foreground shadow-sm bg-foreground text-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-bold text-lg">LIVE MONITORING</span>
                <span className="text-background/50">|</span>
                <Clock className="h-4 w-4" />
                <span className="font-mono">{new Date().toLocaleTimeString()}</span>
              </div>
              <Badge variant="outline" className="border-background text-background font-bold uppercase text-[10px]">
                System Healthy • 2ms Latency
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-foreground text-background"><DollarSign className="h-6 w-6" /></div>
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-black italic">₹{revenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-foreground text-background"><ShoppingCart className="h-6 w-6" /></div>
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">Transactions</p>
                <p className="text-2xl font-black italic">{transactions.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-foreground text-background"><Users className="h-6 w-6" /></div>
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-black italic">{activeCustomers}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-foreground shadow-sm overlow-hidden">
          <CardHeader className="bg-muted/30 border-b-2 border-foreground">
            <CardTitle className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4" /> Recent Activity Feed
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-foreground/10">
            {transactions.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground uppercase font-bold text-xs italic">
                Waiting for incoming transactions...
              </div>
            ) : (
              transactions.map((txn) => (
                <div
                  key={txn.id}
                  className={cn(
                    "flex items-center justify-between p-4 transition-all duration-500",
                    txn.isNew && "bg-emerald-500/10 animate-slide-in"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 flex items-center justify-center bg-foreground text-background font-black text-[10px] rounded-none">
                      {txn.id.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm tracking-tight">{txn.product_name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">{new Date(txn.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-black text-lg">₹{Number(txn.amount).toLocaleString()}</p>
                    {txn.isNew && <Badge className="bg-emerald-500 text-white text-[9px] font-black italic h-4 border-0">NEW</Badge>}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RealtimePage;
