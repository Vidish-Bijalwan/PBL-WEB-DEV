import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSalesAnalytics } from "@/hooks/useSalesAnalytics";
import { Loader2 } from "lucide-react";

const SalesPage = () => {
  const [range, setRange] = useState<'today' | '7d' | '30d'>('7d');
  const { data, loading } = useSalesAnalytics(range);

  return (
    <DashboardLayout
      title="Sales Analytics"
      subtitle="Detailed breakdown of revenue, transactions, and trends"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs value={range} onValueChange={(v) => setRange(v as 'today' | '7d' | '30d')} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3 border-2 border-foreground h-12">
              <TabsTrigger value="today" className="font-bold uppercase text-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Today</TabsTrigger>
              <TabsTrigger value="7d" className="font-bold uppercase text-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Last 7 Days</TabsTrigger>
              <TabsTrigger value="30d" className="font-bold uppercase text-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Last 30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-foreground shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold uppercase tracking-wide">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.revenueByDay}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="#1a1a1a" fill="#1a1a1a1a" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-foreground shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold uppercase tracking-wide">Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.revenueByCategory} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                        <XAxis type="number" />
                        <YAxis dataKey="category" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#1d9e75" barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-2 border-foreground shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold uppercase tracking-wide">Week over Week Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.revenueByDay}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#185fa5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-foreground shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold uppercase tracking-wide">Hourly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.revenueByHour}>
                        <XAxis dataKey="hour" fontSize={10} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#1d9e75" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SalesPage;
