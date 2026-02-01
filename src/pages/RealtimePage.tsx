import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, DollarSign, ShoppingCart, Users, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveMetric {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
}

const RealtimePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [salesCount, setSalesCount] = useState(142);
  const [revenue, setRevenue] = useState(8472);
  const [activeCustomers, setActiveCustomers] = useState(23);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate live data updates
      if (Math.random() > 0.7) {
        setSalesCount(prev => prev + Math.floor(Math.random() * 3));
        setRevenue(prev => prev + Math.floor(Math.random() * 150));
      }
      if (Math.random() > 0.5) {
        setActiveCustomers(prev => Math.max(10, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const liveMetrics: LiveMetric[] = [
    { label: "Today's Revenue", value: `$${revenue.toLocaleString()}`, trend: "up", icon: DollarSign },
    { label: "Transactions Today", value: salesCount.toString(), trend: "up", icon: ShoppingCart },
    { label: "Active Customers", value: activeCustomers.toString(), trend: "neutral", icon: Users },
    { label: "Avg Response Time", value: "1.2s", trend: "down", icon: Zap }
  ];

  const recentTransactions = [
    { id: "TXN-8842", store: "Manhattan", amount: 245.99, time: "2 min ago" },
    { id: "TXN-8841", store: "Beverly Hills", amount: 89.50, time: "4 min ago" },
    { id: "TXN-8840", store: "Chicago", amount: 156.00, time: "5 min ago" },
    { id: "TXN-8839", store: "Seattle", amount: 312.75, time: "7 min ago" },
    { id: "TXN-8838", store: "Miami", amount: 67.25, time: "8 min ago" },
    { id: "TXN-8837", store: "Boston", amount: 198.00, time: "10 min ago" }
  ];

  return (
    <DashboardLayout 
      title="Real-time Monitor" 
      subtitle="Live sales and activity tracking"
    >
      <div className="space-y-6">
        {/* Live Status */}
        <Card className="border-2 border-foreground shadow-sm bg-foreground text-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-chart-2 rounded-full animate-pulse" />
                <span className="font-bold text-lg">LIVE</span>
                <span className="text-background/70">|</span>
                <Clock className="h-4 w-4" />
                <span className="font-mono">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <Badge variant="outline" className="border-background text-background font-semibold">
                All Systems Operational
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveMetrics.map((metric, index) => (
            <Card key={index} className="border-2 border-foreground shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-foreground">
                    <metric.icon className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase font-medium">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
                <div className={cn(
                  "mt-2 h-1 w-full",
                  metric.trend === "up" ? "bg-chart-2" :
                  metric.trend === "down" ? "bg-destructive" :
                  "bg-muted"
                )} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transactions */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
            <Badge variant="outline" className="border-foreground font-mono">
              Auto-refresh: 2s
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div 
                  key={txn.id} 
                  className="flex items-center justify-between p-4 border-2 border-foreground hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold">{txn.id}</span>
                    <Badge variant="outline" className="border-foreground">
                      {txn.store}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-lg">
                      ${txn.amount.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {txn.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RealtimePage;
