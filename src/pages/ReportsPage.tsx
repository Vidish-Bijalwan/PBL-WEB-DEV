import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BarChart, PieChart, Table } from "lucide-react";

const reports = [
  {
    title: "Daily Sales Report",
    description: "Comprehensive daily breakdown of all sales transactions",
    icon: FileText,
    lastGenerated: "Today, 6:00 AM"
  },
  {
    title: "Weekly Performance Summary",
    description: "Week-over-week comparison of key metrics",
    icon: BarChart,
    lastGenerated: "Jan 27, 2026"
  },
  {
    title: "Monthly Revenue Report",
    description: "Detailed monthly revenue analysis by category and store",
    icon: PieChart,
    lastGenerated: "Jan 1, 2026"
  },
  {
    title: "Store Comparison Report",
    description: "Side-by-side performance comparison of all stores",
    icon: Table,
    lastGenerated: "Jan 29, 2026"
  },
  {
    title: "Employee Performance Report",
    description: "Individual and team sales performance metrics",
    icon: FileText,
    lastGenerated: "Jan 28, 2026"
  },
  {
    title: "Inventory Turnover Report",
    description: "Product movement and stock analysis",
    icon: BarChart,
    lastGenerated: "Jan 25, 2026"
  }
];

const ReportsPage = () => {
  return (
    <DashboardLayout 
      title="Reports" 
      subtitle="Generate and download analytics reports"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide">
              Quick Generate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="border-2 border-foreground font-semibold">
                <Calendar className="mr-2 h-4 w-4" />
                Daily Report
              </Button>
              <Button variant="outline" className="border-2 border-foreground font-semibold">
                <Calendar className="mr-2 h-4 w-4" />
                Weekly Report
              </Button>
              <Button variant="outline" className="border-2 border-foreground font-semibold">
                <Calendar className="mr-2 h-4 w-4" />
                Monthly Report
              </Button>
              <Button variant="outline" className="border-2 border-foreground font-semibold">
                <Calendar className="mr-2 h-4 w-4" />
                Custom Range
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report, index) => (
            <Card key={index} className="border-2 border-foreground shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-foreground">
                    <report.icon className="h-5 w-5 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {report.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">
                      Last: {report.lastGenerated}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1 font-semibold">
                    Generate
                  </Button>
                  <Button size="sm" variant="outline" className="border-2 border-foreground">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
