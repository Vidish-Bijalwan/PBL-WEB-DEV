import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { topProducts } from "@/data/mockData";
import { Package, TrendingUp, TrendingDown, DollarSign, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductsPage = () => {
  const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalUnits = topProducts.reduce((sum, p) => sum + p.unitsSold, 0);

  return (
    <DashboardLayout 
      title="Product Analytics" 
      subtitle="Product performance and inventory insights"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-foreground shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground">
                  <Package className="h-6 w-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-medium">Products Tracked</p>
                  <p className="text-3xl font-bold">{topProducts.length}</p>
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
                  <ShoppingCart className="h-6 w-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-medium">Units Sold</p>
                  <p className="text-3xl font-bold">{totalUnits.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide">
              All Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-foreground">
                  <TableHead className="font-bold uppercase text-xs">Product</TableHead>
                  <TableHead className="font-bold uppercase text-xs">SKU</TableHead>
                  <TableHead className="font-bold uppercase text-xs">Category</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Units Sold</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Revenue</TableHead>
                  <TableHead className="font-bold uppercase text-xs text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id} className="border-foreground/20">
                    <TableCell className="font-semibold">{product.name}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {product.sku}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium border-foreground">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {product.unitsSold.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      ${product.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "font-semibold flex items-center justify-end gap-1",
                        product.growth >= 0 ? "text-chart-2" : "text-destructive"
                      )}>
                        {product.growth >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {product.growth >= 0 ? "+" : ""}{product.growth}%
                      </span>
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

export default ProductsPage;
