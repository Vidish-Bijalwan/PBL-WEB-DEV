import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { storePerformance } from "@/data/mockData";
import { MapPin, TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const StoresPage = () => {
  const totalRevenue = storePerformance.reduce((sum, store) => sum + store.revenue, 0);
  const avgAchievement = storePerformance.reduce((sum, store) => sum + store.achievement, 0) / storePerformance.length;

  return (
    <DashboardLayout 
      title="Store Performance" 
      subtitle="Monitor and compare store metrics"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground">
                  <MapPin className="h-6 w-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-medium">Total Stores</p>
                  <p className="text-3xl font-bold">{storePerformance.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground">
                  <DollarSign className="h-6 w-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold">${(totalRevenue / 1000000).toFixed(2)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground">
                  <TrendingUp className="h-6 w-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-medium">Avg Achievement</p>
                  <p className="text-3xl font-bold">{avgAchievement.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stores Table */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide">
              All Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-foreground">
                  <TableHead className="font-bold uppercase text-xs">Store</TableHead>
                  <TableHead className="font-bold uppercase text-xs">City</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Revenue</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Target</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Transactions</TableHead>
                  <TableHead className="font-bold uppercase text-xs">Achievement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {storePerformance.map((store) => (
                  <TableRow key={store.id} className="border-foreground/20">
                    <TableCell className="font-semibold">{store.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium border-foreground">
                        {store.city}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      ${store.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      ${store.target.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {store.transactions.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress 
                          value={Math.min(store.achievement, 100)} 
                          className="h-2 w-24"
                        />
                        <span className={cn(
                          "font-semibold text-sm flex items-center gap-1",
                          store.achievement >= 100 ? "text-chart-2" : "text-chart-1"
                        )}>
                          {store.achievement >= 100 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {store.achievement.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StoresPage;
