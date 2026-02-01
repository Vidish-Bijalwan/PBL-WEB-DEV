import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesTrendChart } from "@/components/dashboard/SalesTrendChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { HourlySalesChart } from "@/components/dashboard/HourlySalesChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { salesTrend } from "@/data/mockData";

const SalesPage = () => {
  // Create comparison data
  const comparisonData = salesTrend.slice(0, 14).map((item, index) => ({
    date: item.date,
    thisWeek: item.revenue,
    lastWeek: item.revenue * (0.85 + Math.random() * 0.2)
  }));

  return (
    <DashboardLayout 
      title="Sales Analytics" 
      subtitle="Deep dive into sales performance"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesTrendChart />
          <CategoryPieChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HourlySalesChart />
          
          <Card className="border-2 border-foreground shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold uppercase tracking-wide">
                Week-over-Week Comparison
              </CardTitle>
              <p className="text-sm text-muted-foreground">This week vs last week</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData.slice(0, 7)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      width={60}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--foreground))",
                        borderRadius: "0",
                        fontWeight: 600
                      }}
                    />
                    <Legend />
                    <Bar dataKey="thisWeek" name="This Week" fill="hsl(var(--foreground))" />
                    <Bar dataKey="lastWeek" name="Last Week" fill="hsl(var(--muted-foreground))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold uppercase tracking-wide">
              Revenue & Transactions Trend
            </CardTitle>
            <p className="text-sm text-muted-foreground">Combined view of key metrics</p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={60}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--foreground))",
                      borderRadius: "0",
                      fontWeight: 600
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="hsl(var(--foreground))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="transactions"
                    name="Transactions"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SalesPage;
