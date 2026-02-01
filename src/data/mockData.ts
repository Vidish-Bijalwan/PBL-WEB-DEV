// Mock data for the Retail Sales Dashboard

export interface KPIMetric {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface SalesTrend {
  date: string;
  revenue: number;
  transactions: number;
}

export interface CategorySales {
  name: string;
  value: number;
  fill: string;
}

export interface TopProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitsSold: number;
  revenue: number;
  growth: number;
}

export interface StorePerformance {
  id: string;
  name: string;
  city: string;
  revenue: number;
  target: number;
  transactions: number;
  achievement: number;
}

export interface EmployeePerformance {
  id: string;
  name: string;
  store: string;
  role: string;
  salesAmount: number;
  transactions: number;
  avgTicket: number;
  rating: number;
}

export const kpiMetrics: KPIMetric[] = [
  {
    title: "Total Revenue",
    value: "$2,847,392",
    change: 12.5,
    changeLabel: "vs last month",
    icon: "dollar-sign"
  },
  {
    title: "Transactions",
    value: "48,294",
    change: 8.2,
    changeLabel: "vs last month",
    icon: "shopping-cart"
  },
  {
    title: "Avg Ticket Size",
    value: "$58.96",
    change: 3.8,
    changeLabel: "vs last month",
    icon: "receipt"
  },
  {
    title: "YoY Growth",
    value: "+24.3%",
    change: 24.3,
    changeLabel: "vs last year",
    icon: "trending-up"
  }
];

export const salesTrend: SalesTrend[] = [
  { date: "Jan 1", revenue: 85000, transactions: 1420 },
  { date: "Jan 2", revenue: 92000, transactions: 1580 },
  { date: "Jan 3", revenue: 78000, transactions: 1320 },
  { date: "Jan 4", revenue: 95000, transactions: 1650 },
  { date: "Jan 5", revenue: 110000, transactions: 1890 },
  { date: "Jan 6", revenue: 125000, transactions: 2100 },
  { date: "Jan 7", revenue: 118000, transactions: 1980 },
  { date: "Jan 8", revenue: 89000, transactions: 1520 },
  { date: "Jan 9", revenue: 96000, transactions: 1620 },
  { date: "Jan 10", revenue: 102000, transactions: 1750 },
  { date: "Jan 11", revenue: 98000, transactions: 1680 },
  { date: "Jan 12", revenue: 115000, transactions: 1920 },
  { date: "Jan 13", revenue: 132000, transactions: 2240 },
  { date: "Jan 14", revenue: 128000, transactions: 2150 },
  { date: "Jan 15", revenue: 94000, transactions: 1590 },
  { date: "Jan 16", revenue: 101000, transactions: 1720 },
  { date: "Jan 17", revenue: 108000, transactions: 1840 },
  { date: "Jan 18", revenue: 112000, transactions: 1910 },
  { date: "Jan 19", revenue: 125000, transactions: 2080 },
  { date: "Jan 20", revenue: 145000, transactions: 2420 },
  { date: "Jan 21", revenue: 138000, transactions: 2300 },
  { date: "Jan 22", revenue: 99000, transactions: 1680 },
  { date: "Jan 23", revenue: 106000, transactions: 1790 },
  { date: "Jan 24", revenue: 115000, transactions: 1950 },
  { date: "Jan 25", revenue: 122000, transactions: 2050 },
  { date: "Jan 26", revenue: 135000, transactions: 2280 },
  { date: "Jan 27", revenue: 155000, transactions: 2600 },
  { date: "Jan 28", revenue: 148000, transactions: 2480 },
  { date: "Jan 29", revenue: 105000, transactions: 1780 },
  { date: "Jan 30", revenue: 112000, transactions: 1890 }
];

export const categorySales: CategorySales[] = [
  { name: "Electronics", value: 892400, fill: "hsl(var(--chart-1))" },
  { name: "Apparel", value: 654200, fill: "hsl(var(--chart-2))" },
  { name: "Home & Garden", value: 478600, fill: "hsl(var(--chart-3))" },
  { name: "Sports", value: 356800, fill: "hsl(var(--chart-4))" },
  { name: "Beauty", value: 289400, fill: "hsl(var(--chart-5))" },
  { name: "Other", value: 175992, fill: "hsl(var(--muted-foreground))" }
];

export const topProducts: TopProduct[] = [
  { id: "1", name: "iPhone 15 Pro Max", sku: "APL-IP15PM", category: "Electronics", unitsSold: 2840, revenue: 3408000, growth: 18.5 },
  { id: "2", name: "Samsung Galaxy S24 Ultra", sku: "SAM-S24U", category: "Electronics", unitsSold: 2120, revenue: 2756000, growth: 15.2 },
  { id: "3", name: "Nike Air Max 270", sku: "NKE-AM270", category: "Sports", unitsSold: 4580, revenue: 686700, growth: 22.8 },
  { id: "4", name: "Sony WH-1000XM5", sku: "SNY-WH5", category: "Electronics", unitsSold: 1890, revenue: 661500, growth: 12.4 },
  { id: "5", name: "Levi's 501 Original", sku: "LVI-501", category: "Apparel", unitsSold: 5240, revenue: 524000, growth: 8.9 },
  { id: "6", name: "Dyson V15 Detect", sku: "DYS-V15", category: "Home & Garden", unitsSold: 720, revenue: 503280, growth: 25.6 },
  { id: "7", name: "Apple Watch Series 9", sku: "APL-AWS9", category: "Electronics", unitsSold: 1280, revenue: 499200, growth: 14.3 },
  { id: "8", name: "Adidas Ultraboost 23", sku: "ADI-UB23", category: "Sports", unitsSold: 2680, revenue: 482400, growth: 19.1 }
];

export const storePerformance: StorePerformance[] = [
  { id: "1", name: "Manhattan Flagship", city: "New York", revenue: 458200, target: 450000, transactions: 7820, achievement: 101.8 },
  { id: "2", name: "Beverly Hills", city: "Los Angeles", revenue: 392400, target: 400000, transactions: 6540, achievement: 98.1 },
  { id: "3", name: "Michigan Ave", city: "Chicago", revenue: 328600, target: 320000, transactions: 5480, achievement: 102.7 },
  { id: "4", name: "Union Square", city: "San Francisco", revenue: 298400, target: 310000, transactions: 4920, achievement: 96.3 },
  { id: "5", name: "Downtown Seattle", city: "Seattle", revenue: 275800, target: 260000, transactions: 4580, achievement: 106.1 },
  { id: "6", name: "Miami Beach", city: "Miami", revenue: 264200, target: 280000, transactions: 4380, achievement: 94.4 },
  { id: "7", name: "Boston Common", city: "Boston", revenue: 248600, target: 250000, transactions: 4120, achievement: 99.4 },
  { id: "8", name: "Pearl District", city: "Portland", revenue: 218400, target: 210000, transactions: 3640, achievement: 104.0 }
];

export const employeePerformance: EmployeePerformance[] = [
  { id: "1", name: "Sarah Johnson", store: "Manhattan Flagship", role: "Senior Associate", salesAmount: 128400, transactions: 420, avgTicket: 305.71, rating: 4.9 },
  { id: "2", name: "Michael Chen", store: "Beverly Hills", role: "Sales Manager", salesAmount: 115600, transactions: 380, avgTicket: 304.21, rating: 4.8 },
  { id: "3", name: "Emily Rodriguez", store: "Michigan Ave", role: "Senior Associate", salesAmount: 98200, transactions: 340, avgTicket: 288.82, rating: 4.7 },
  { id: "4", name: "David Kim", store: "Union Square", role: "Associate", salesAmount: 89400, transactions: 320, avgTicket: 279.38, rating: 4.6 },
  { id: "5", name: "Jessica Williams", store: "Manhattan Flagship", role: "Associate", salesAmount: 84600, transactions: 310, avgTicket: 272.90, rating: 4.5 },
  { id: "6", name: "James Brown", store: "Downtown Seattle", role: "Senior Associate", salesAmount: 78200, transactions: 290, avgTicket: 269.66, rating: 4.7 }
];

export const hourlyData = [
  { hour: "9AM", sales: 12400, transactions: 42 },
  { hour: "10AM", sales: 18600, transactions: 64 },
  { hour: "11AM", sales: 24800, transactions: 86 },
  { hour: "12PM", sales: 32400, transactions: 112 },
  { hour: "1PM", sales: 28600, transactions: 98 },
  { hour: "2PM", sales: 22400, transactions: 78 },
  { hour: "3PM", sales: 26800, transactions: 92 },
  { hour: "4PM", sales: 31200, transactions: 108 },
  { hour: "5PM", sales: 38400, transactions: 132 },
  { hour: "6PM", sales: 42600, transactions: 148 },
  { hour: "7PM", sales: 36800, transactions: 126 },
  { hour: "8PM", sales: 28400, transactions: 98 },
  { hour: "9PM", sales: 18200, transactions: 62 }
];
