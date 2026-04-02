import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Users, UserCheck, Star, Award, Loader2 } from "lucide-react";

interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  store_id: string;
}

const EmployeesPage = () => {
  const { data: employees, loading } = useSupabaseTable<EmployeeProfile>('profiles');

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Employee Performance"
      subtitle="Track your team's sales performance and rankings"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-foreground text-background">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">Team Size</p>
                <p className="text-2xl font-black">{employees.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-foreground shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50 border-b-2 border-foreground">
              <TableRow className="border-none">
                <TableHead className="font-bold uppercase text-xs text-foreground">Employee Name</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground text-center">Role</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground text-center">Status</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground font-bold uppercase text-xs">
                    No employees registered in the system.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => (
                  <TableRow key={emp.id} className="border-b border-foreground/10 hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex items-center justify-center bg-muted/50 border-2 border-foreground rounded-full font-bold">
                          {emp.name.substring(0, 1)}
                        </div>
                        <span className="font-bold">{emp.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-[10px] font-bold border-foreground uppercase">
                        {emp.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-emerald-500 font-bold uppercase text-[9px]">
                      Online
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="font-bold text-xs">4.8</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeesPage;
