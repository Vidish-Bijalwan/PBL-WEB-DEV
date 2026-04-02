import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesTrendChart } from "@/components/dashboard/SalesTrendChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { StorePerformanceChart } from "@/components/dashboard/StorePerformanceChart";
import { HourlySalesChart } from "@/components/dashboard/HourlySalesChart";
import { TopProductsTable } from "@/components/dashboard/TopProductsTable";
import { RetailPulseAI } from "@/components/dashboard/RetailPulseAI";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const { stats, recentTransactions, loading } = useDashboardData();

  if (loading && stats.revenue === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-foreground" />
          <p className="text-sm font-bold uppercase tracking-widest animate-pulse">
            Connecting to Store...
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Dashboard Overview"
      subtitle="Comprehensive retail analytics and performance metrics"
    >
      <div className="space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
            change={stats.revenueDelta}
            changeLabel="vs yesterday"
            icon="dollar-sign"
          />
          <KPICard
            title="Transactions"
            value={stats.transactions.toString()}
            change={stats.transactionsDelta}
            changeLabel="vs yesterday"
            icon="shopping-cart"
          />
          <KPICard
            title="Avg Ticket Size"
            value={`₹${Math.round(stats.avgTicket).toLocaleString()}`}
            change={stats.avgTicketDelta}
            changeLabel="vs yesterday"
            icon="receipt"
          />
          <KPICard
            title="YoY Growth"
            value={`${stats.growth.toFixed(1)}%`}
            change={stats.growthDelta}
            changeLabel="vs last year"
            icon="trending-up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesTrendChart />
          <CategoryPieChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StorePerformanceChart />
          </div>
          <HourlySalesChart />
        </div>

        {/* Recent Transactions & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RetailPulseAI />
            <Card className="border-2 border-foreground shadow-sm h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-chart-2 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Live</span>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-foreground">
                      <TableHead className="font-bold uppercase text-xs">ID</TableHead>
                      <TableHead className="font-bold uppercase text-xs">Product</TableHead>
                      <TableHead className="font-bold uppercase text-xs">Category</TableHead>
                      <TableHead className="font-bold uppercase text-xs text-right">Amount</TableHead>
                      <TableHead className="font-bold uppercase text-xs text-center">Status</TableHead>
                      <TableHead className="font-bold uppercase text-xs text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground italic">
                          No transactions found today.
                        </TableCell>
                      </TableRow>
                    ) : (
                      recentTransactions.map((txn) => (
                        <TableRow key={txn.id} className="border-foreground/20 hover:bg-accent/30 transition-colors">
                          <TableCell className="font-mono text-xs font-bold truncate max-w-[80px]">
                            {txn.id.split('-')[0].toUpperCase()}
                          </TableCell>
                          <TableCell className="font-semibold">{txn.product_name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] font-bold border-foreground">
                              {txn.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold">
                            ₹{Number(txn.amount).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={cn(
                              "uppercase text-[10px] font-bold border",
                              txn.status === "completed" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300",
                              txn.status === "pending" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-300",
                              txn.status === "refund" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300"
                            )}>
                              {txn.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono text-xs text-muted-foreground">
                            {new Date(txn.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <TopProductsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
