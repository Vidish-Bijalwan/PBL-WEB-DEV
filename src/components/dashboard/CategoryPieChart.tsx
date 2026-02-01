import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { categorySales } from "@/data/mockData";

export function CategoryPieChart() {
  const total = categorySales.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-2 border-foreground shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Sales by Category
        </CardTitle>
        <p className="text-sm text-muted-foreground">Revenue distribution</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySales}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                stroke="hsl(var(--background))"
                strokeWidth={2}
              >
                {categorySales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `$${(value / 1000).toFixed(0)}K (${((value / total) * 100).toFixed(1)}%)`,
                  "Revenue"
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "2px solid hsl(var(--foreground))",
                  borderRadius: "0",
                  fontWeight: 600
                }}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value) => (
                  <span className="text-sm font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
