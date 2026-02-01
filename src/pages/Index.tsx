import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesTrendChart } from "@/components/dashboard/SalesTrendChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { StorePerformanceChart } from "@/components/dashboard/StorePerformanceChart";
import { TopProductsTable } from "@/components/dashboard/TopProductsTable";
import { HourlySalesChart } from "@/components/dashboard/HourlySalesChart";
import { kpiMetrics } from "@/data/mockData";

const Index = () => {
  return (
    <DashboardLayout 
      title="Dashboard Overview" 
      subtitle="Real-time retail analytics and performance metrics"
    >
      <div className="space-y-6">
        {/* KPI Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiMetrics.map((metric) => (
              <KPICard key={metric.title} {...metric} />
            ))}
          </div>
        </section>

        {/* Main Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesTrendChart />
          </div>
          <div>
            <CategoryPieChart />
          </div>
        </section>

        {/* Secondary Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StorePerformanceChart />
          <HourlySalesChart />
        </section>

        {/* Top Products Table */}
        <section>
          <TopProductsTable />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
