import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Package, TrendingUp, IndianRupee, Loader2, ArrowUpRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
}

const ProductsPage = () => {
  const { data: products, loading } = useSupabaseTable<Product>('products');

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Product Analytics"
      subtitle="Insights into inventory performance and profitability"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-foreground text-background">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">Active SKUs</p>
                <p className="text-2xl font-black">{products.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-foreground shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50 border-b-2 border-foreground">
              <TableRow className="border-none">
                <TableHead className="font-bold uppercase text-xs text-foreground">Product</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground">Category</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground text-right">Price</TableHead>
                <TableHead className="font-bold uppercase text-xs text-foreground text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground font-bold uppercase text-xs">
                    No products found in the catalog.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="border-b border-foreground/10 hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">{product.name}</span>
                        <span className="text-[10px] font-mono font-bold text-muted-foreground">ID: {product.id.split('-')[0].toUpperCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-bold border-foreground uppercase">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      ₹{Number(product.price).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 text-emerald-500">
                        <ArrowUpRight className="h-3 w-3" />
                        <span className="text-[10px] font-black italic">TOP SELLER</span>
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

export default ProductsPage;
