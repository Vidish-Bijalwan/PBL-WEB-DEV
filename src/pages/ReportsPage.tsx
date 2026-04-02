import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BarChart, PieChart, Table, Loader2 } from "lucide-react";
import { useExport } from "@/hooks/useExport";
import { useToast } from "@/hooks/use-toast";

type ExportType = "daily" | "weekly" | "monthly" | "stores" | "employees" | "inventory";

const reports: { title: string; description: string; icon: React.ElementType; lastGenerated: string; exportType: ExportType }[] = [
  {
    title: "Daily Sales Report",
    description: "Comprehensive daily breakdown of all sales transactions",
    icon: FileText,
    lastGenerated: "Today, LIVE",
    exportType: "daily",
  },
  {
    title: "Weekly Performance Summary",
    description: "Week-over-week comparison of key metrics",
    icon: BarChart,
    lastGenerated: "Last Sunday",
    exportType: "weekly",
  },
  {
    title: "Monthly Revenue Report",
    description: "Detailed monthly revenue analysis by category and store",
    icon: PieChart,
    lastGenerated: "Last Month",
    exportType: "monthly",
  },
  {
    title: "Store Comparison Report",
    description: "Side-by-side performance comparison of all stores",
    icon: Table,
    lastGenerated: "Automated",
    exportType: "stores",
  },
  {
    title: "Employee Performance Report",
    description: "Individual and team sales performance metrics",
    icon: FileText,
    lastGenerated: "Automated",
    exportType: "employees",
  },
  {
    title: "Inventory Turnover Report",
    description: "Product movement and stock analysis",
    icon: BarChart,
    lastGenerated: "Automated",
    exportType: "inventory",
  }
];

const ReportsPage = () => {
  const { exportData } = useExport();
  const { toast } = useToast();
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const handleGenerate = async (index: number, exportType: ExportType) => {
    setGeneratingIndex(index);
    // Simulate generation delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 1500));
    await exportData(exportType);
    setGeneratingIndex(null);
  };

  const handleQuickGenerate = (type: ExportType) => {
    exportData(type);
  };

  return (
    <DashboardLayout
      title="Reports"
      subtitle="Generate and download analytics reports from Supabase"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card className="border-2 border-foreground shadow-sm bg-muted/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide">Quick Download</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="border-2 border-foreground font-bold uppercase h-12" onClick={() => handleQuickGenerate("daily")}>
                <Calendar className="mr-2 h-4 w-4" /> Daily Sale
              </Button>
              <Button variant="outline" className="border-2 border-foreground font-bold uppercase h-12" onClick={() => handleQuickGenerate("weekly")}>
                <Calendar className="mr-2 h-4 w-4" /> Weekly Summary
              </Button>
              <Button variant="outline" className="border-2 border-foreground font-bold uppercase h-12" onClick={() => handleQuickGenerate("monthly")}>
                <Calendar className="mr-2 h-4 w-4" /> Monthly Revenue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Card key={index} className="border-2 border-foreground shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-foreground">
                    <report.icon className="h-6 w-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-sm uppercase italic">{report.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {report.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-mono font-bold tracking-tighter">
                      SYNC: {report.lastGenerated}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button
                    size="sm"
                    className="flex-1 font-black uppercase text-xs h-10 tracking-widest"
                    disabled={generatingIndex === index}
                    onClick={() => handleGenerate(index, report.exportType)}
                  >
                    {generatingIndex === index ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Report"
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-foreground h-10 w-10 p-0"
                    onClick={() => exportData(report.exportType)}
                  >
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
