import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { topProducts } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function TopProductsTable() {
  return (
    <Card className="border-2 border-foreground shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wide">
          Top Products
        </CardTitle>
        <p className="text-sm text-muted-foreground">Best performing items</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-foreground">
              <TableHead className="font-bold uppercase text-xs">Product</TableHead>
              <TableHead className="font-bold uppercase text-xs">Category</TableHead>
              <TableHead className="font-bold uppercase text-xs text-right">Units Sold</TableHead>
              <TableHead className="font-bold uppercase text-xs text-right">Revenue</TableHead>
              <TableHead className="font-bold uppercase text-xs text-right">Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.slice(0, 6).map((product) => (
              <TableRow key={product.id} className="border-foreground/20">
                <TableCell>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-semibold border-foreground">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">
                  {product.unitsSold.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">
                  ${(product.revenue / 1000).toFixed(0)}K
                </TableCell>
                <TableCell className="text-right">
                  <div className={cn(
                    "inline-flex items-center gap-1 font-semibold",
                    product.growth >= 0 ? "text-chart-2" : "text-destructive"
                  )}>
                    {product.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {product.growth >= 0 ? "+" : ""}{product.growth}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
