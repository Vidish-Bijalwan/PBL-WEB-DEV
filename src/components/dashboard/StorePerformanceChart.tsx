import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { storePerformance } from "@/data/mockData";

export function StorePerformanceChart() {
  const data = storePerformance.slice(0, 6).map((store) => ({
    ...store,
    shortName: store.name.split(" ")[0]
  }));

  return (
    <Card className="border-2 border-foreground shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Store Performance
        </CardTitle>
        <p className="text-sm text-muted-foreground">Revenue vs Target</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                type="category" 
                dataKey="shortName"
                tick={{ fontSize: 12, fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                width={80}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === "revenue" ? "Revenue" : "Target"
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "2px solid hsl(var(--foreground))",
                  borderRadius: "0",
                  fontWeight: 600
                }}
              />
              <Bar dataKey="target" fill="hsl(var(--muted))" barSize={16} />
              <Bar dataKey="revenue" barSize={16}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.achievement >= 100 ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
