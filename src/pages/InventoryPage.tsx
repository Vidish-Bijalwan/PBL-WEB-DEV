import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Package, AlertTriangle, TrendingUp, Box, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInventory {
    id: string;
    name: string;
    category: string;
    stock_qty: number;
}

const InventoryPage = () => {
    const { data: products, loading } = useSupabaseTable<ProductInventory>('products');

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    const criticalItems = products.filter(p => p.stock_qty < 5);
    const lowItems = products.filter(p => p.stock_qty >= 5 && p.stock_qty < 20);

    return (
        <DashboardLayout
            title="Inventory Management"
            subtitle="Live stock tracking and replenishment alerts"
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-2 border-foreground shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-red-500 text-white">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase text-muted-foreground">Critical Stock</p>
                                <p className="text-2xl font-black text-red-500">{criticalItems.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-foreground shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-foreground text-background">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase text-muted-foreground">Total Skus</p>
                                <p className="text-2xl font-black">{products.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-2 border-foreground shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b-2 border-foreground">
                        <CardTitle className="text-sm font-black uppercase italic tracking-widest">Live Inventory Status</CardTitle>
                    </CardHeader>
                    <Table>
                        <TableHeader className="bg-muted/50 border-b-2 border-foreground">
                            <TableRow className="border-none">
                                <TableHead className="font-bold uppercase text-xs text-foreground">Product</TableHead>
                                <TableHead className="font-bold uppercase text-xs text-foreground">Category</TableHead>
                                <TableHead className="font-bold uppercase text-xs text-foreground text-right">Stock Level</TableHead>
                                <TableHead className="font-bold uppercase text-xs text-foreground text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground font-bold uppercase text-xs">
                                        No items in inventory.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((item) => {
                                    const status = item.stock_qty < 5 ? "critical" : item.stock_qty < 20 ? "low" : "healthy";
                                    return (
                                        <TableRow key={item.id} className="border-b border-foreground/10 hover:bg-muted/30 transition-colors">
                                            <TableCell className="font-bold">{item.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-[10px] font-bold border-foreground uppercase">
                                                    {item.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-mono font-bold">
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className={cn(
                                                        "text-sm font-black italic",
                                                        status === 'critical' ? 'text-red-500' : status === 'low' ? 'text-amber-500' : 'text-emerald-500'
                                                    )}>
                                                        {item.stock_qty} UNITS
                                                    </span>
                                                    <Progress
                                                        value={(item.stock_qty / 100) * 100}
                                                        className={cn("h-1.5 w-24 rounded-none", status === 'critical' && "bg-red-200")}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={cn(
                                                    "uppercase text-[9px] font-black border-0",
                                                    status === 'critical' ? 'bg-red-500 text-white' :
                                                        status === 'low' ? 'bg-amber-500 text-white' :
                                                            'bg-emerald-500 text-white'
                                                )}>
                                                    {status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default InventoryPage;
