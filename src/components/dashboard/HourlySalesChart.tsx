import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { hourlyData } from "@/data/mockData";

export function HourlySalesChart() {
  return (
    <Card className="border-2 border-foreground shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Sales by Hour
        </CardTitle>
        <p className="text-sm text-muted-foreground">Today's hourly breakdown</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                width={50}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "2px solid hsl(var(--foreground))",
                  borderRadius: "0",
                  fontWeight: 600
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="hsl(var(--foreground))" 
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
