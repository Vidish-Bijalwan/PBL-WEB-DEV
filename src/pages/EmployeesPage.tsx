import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { employeePerformance } from "@/data/mockData";
import { Users, DollarSign, Star, TrendingUp } from "lucide-react";

const EmployeesPage = () => {
  const totalSales = employeePerformance.reduce((sum, e) => sum + e.salesAmount, 0);
  const avgRating = employeePerformance.reduce((sum, e) => sum + e.rating, 0) / employeePerformance.length;

  return (
    <DashboardLayout 
      title="Employee Performance" 
      subtitle="Sales team metrics and rankings"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground">
                  <Users className="h-6 w-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-medium">Team Size</p>
                  <p className="text-3xl font-bold">{employeePerformance.length}</p>
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
                  <p className="text-sm text-muted-foreground uppercase font-medium">Team Sales</p>
                  <p className="text-3xl font-bold">${(totalSales / 1000).toFixed(0)}K</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground">
                  <Star className="h-6 w-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-medium">Avg Rating</p>
                  <p className="text-3xl font-bold">{avgRating.toFixed(1)}</p>
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
                  <p className="text-sm text-muted-foreground uppercase font-medium">Avg Ticket</p>
                  <p className="text-3xl font-bold">${(totalSales / employeePerformance.reduce((sum, e) => sum + e.transactions, 0)).toFixed(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employees Table */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide">
              Sales Team Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-foreground">
                  <TableHead className="font-bold uppercase text-xs w-12">#</TableHead>
                  <TableHead className="font-bold uppercase text-xs">Employee</TableHead>
                  <TableHead className="font-bold uppercase text-xs">Store</TableHead>
                  <TableHead className="font-bold uppercase text-xs">Role</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Sales</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Transactions</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Avg Ticket</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeePerformance.map((employee, index) => (
                  <TableRow key={employee.id} className="border-foreground/20">
                    <TableCell>
                      <div className={`h-8 w-8 flex items-center justify-center font-bold ${
                        index === 0 ? "bg-chart-4 text-foreground" :
                        index === 1 ? "bg-muted text-foreground" :
                        index === 2 ? "bg-chart-1 text-background" :
                        "bg-muted/50"
                      }`}>
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{employee.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium border-foreground">
                        {employee.store}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{employee.role}</TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      ${employee.salesAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {employee.transactions}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ${employee.avgTicket.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                        <span className="font-semibold">{employee.rating}</span>
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

export default EmployeesPage;
