import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Store, MapPin, TrendingUp, ShoppingBag, Loader2 } from "lucide-react";

interface StoreData {
  id: string;
  name: string;
  location: string;
  revenue?: number; // Will be calculated
}

const StoresPage = () => {
  const { data: stores, loading } = useSupabaseTable<StoreData>('stores');

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Store Performance"
      subtitle="Detailed overview of all retail locations"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-foreground">
                <Store className="h-6 w-6 text-background" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">Total Stores</p>
                <p className="text-2xl font-black">{stores.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-foreground shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50 border-b-2 border-foreground">
              <TableRow className="border-none">
                <TableHead className="font-bold uppercase text-xs text-foreground">Store Name</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground">Location</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground">Status</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground font-bold uppercase text-xs">
                    No stores registered in the database.
                  </TableCell>
                </TableRow>
              ) : (
                stores.map((store) => (
                  <TableRow key={store.id} className="border-b border-foreground/10 hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex items-center justify-center border-2 border-foreground font-black text-sm">
                          {store.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold">{store.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs font-semibold uppercase">{store.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500 text-white font-bold uppercase text-[9px] border-0">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Target Achievement</span>
                        <div className="flex items-center gap-2 w-32">
                          <Progress value={75} className="h-2 border-2 border-foreground rounded-none" />
                          <span className="text-xs font-mono font-bold">75%</span>
                        </div>
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

export default StoresPage;
