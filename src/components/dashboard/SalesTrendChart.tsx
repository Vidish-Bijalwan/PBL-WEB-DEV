import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { salesTrend } from "@/data/mockData";

export function SalesTrendChart() {
  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="border-2 border-foreground shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Revenue Trend
        </CardTitle>
        <p className="text-sm text-muted-foreground">Last 30 days</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tickFormatter={formatCurrency}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                width={60}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "2px solid hsl(var(--foreground))",
                  borderRadius: "0",
                  fontWeight: 600
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
