# 🛒 RetailPulse — Retail Intelligence System
### Project Presentation & Member Contribution Report

> **Project Status:** ~50% Complete | **Type:** Full-Stack Web Application (PBL Project)
> **Tech Stack:** React + TypeScript · Vite · Tailwind CSS · Supabase (PostgreSQL) · Recharts

---

## 🎯 Project Pitch

> *"RetailPulse is a real-time retail intelligence dashboard designed for modern store managers. It replaces cluttered spreadsheets and disconnected POS systems with a single, beautiful command center. Store admins get live sales analytics, inventory alerts, and AI-powered business insights — while cashiers get a clean, fast point-of-sale interface. Built with industry-standard tools, it simulates the kind of system you'd find in companies like Zara, DMart, or Reliance Retail."*

---

## 📦 Project Division — 4 Members, 4 Modules

The project is cleanly divided into **4 independent modules**, each owned by one team member.

---

### 👤 Member 1 — Authentication & Security Layer
**Responsibility:** User login system, role-based access, and route protection.

| File | Purpose |
|---|---|
| `src/pages/AdminLoginPage.tsx` | Admin login form with email/password authentication |
| `src/pages/LandingPage.tsx` | Entry point — routes to Admin or Staff portal |
| `src/components/AdminGuard.tsx` | Protects admin routes; bounces non-admins back |
| `src/pages/CashierPage.tsx` | Cashier login, registration, and POS session |
| `src/lib/supabaseClient.ts` | Supabase connection & auth client setup |
| `supabase/migrations/fix_rls_policies.sql` | Row Level Security rules for data isolation |

**Core Logic:**
- `AdminGuard.tsx` checks `profiles.role === "admin"` on every protected route
- Cashiers are silently isolated to their own store's data via RLS policies
- Sessions persisted via Supabase Auth tokens

---

### 👤 Member 2 — Admin Dashboard & Analytics Engine
**Responsibility:** KPI cards, charts, real-time data, and AI insights.

| File | Purpose |
|---|---|
| `src/pages/Index.tsx` | Main admin dashboard overview |
| `src/pages/SalesPage.tsx` | Detailed sales reports by date / category |
| `src/pages/RealtimePage.tsx` | Live transaction feed with auto-refresh |
| `src/pages/ReportsPage.tsx` | Exportable reports (CSV) |
| `src/components/dashboard/KPICard.tsx` | Animated KPI tiles (Revenue, Transactions, etc.) |
| `src/components/dashboard/SalesTrendChart.tsx` | Revenue trend line chart (Recharts) |
| `src/components/dashboard/HourlySalesChart.tsx` | Hourly sales bar chart |
| `src/components/dashboard/StorePerformanceChart.tsx` | Multi-store revenue vs. target |
| `src/components/dashboard/CategoryPieChart.tsx` | Revenue split by category |
| `src/components/dashboard/RetailPulseAI.tsx` | AI-powered business insight generator |
| `src/components/dashboard/TopProductsTable.tsx` | Top-selling products leaderboard |
| `src/hooks/useDashboardData.ts` | **Core data hook** — fetches all KPI stats |
| `src/hooks/useSalesAnalytics.ts` | Sales trend aggregation logic |
| `src/hooks/useExport.ts` | CSV export functionality |

**Core Logic:**
- `useDashboardData.ts` is the **heart of the system** — it queries Supabase for live revenue, transaction count, average ticket size, and YoY growth
- `RetailPulseAI.tsx` calls an AI API with real metrics to generate 3 business insights

---

### 👤 Member 3 — Inventory & Store Management
**Responsibility:** Product catalogue, stock levels, store management, and employee records.

| File | Purpose |
|---|---|
| `src/pages/ProductsPage.tsx` | Product listing with search and filters |
| `src/pages/InventoryPage.tsx` | Stock level monitoring with low-stock alerts |
| `src/pages/StoresPage.tsx` | Multi-store overview and management |
| `src/pages/EmployeesPage.tsx` | Employee/cashier records |
| `src/components/dashboard/AnimatedNumber.tsx` | Smooth number animations for stock counts |
| `src/components/dashboard/NotificationDropdown.tsx` | Alert bell for low-stock / spike notifications |
| `src/components/dashboard/SearchDialog.tsx` | Global search across products & pages |
| `supabase/migrations/initialize_schema.sql` | **Database schema** — all 5 tables defined here |

**Core Logic:**
- `initialize_schema.sql` defines the entire database: `stores`, `products`, `profiles`, `transactions`, `alerts`
- Stock decrement trigger auto-fires on every sale and creates an alert if stock drops below 5 units

---

### 👤 Member 4 — UI/UX, Styling & Layout System
**Responsibility:** Design system, responsive layout, theme, and all reusable UI components.

| File | Purpose |
|---|---|
| `src/index.css` | **Global CSS** — Tailwind base, custom variables, animations |
| `src/App.css` | Application-level styles |
| `tailwind.config.ts` | Color palette, typography, and animation config |
| `src/components/layout/DashboardLayout.tsx` | Main shell — sidebar + header + content area |
| `src/components/layout/DashboardSidebar.tsx` | Collapsible navigation sidebar |
| `src/components/layout/DashboardHeader.tsx` | Top bar — search, notifications, export, theme toggle |
| `src/components/ThemeProvider.tsx` | Dark/light mode system |
| `src/components/ui/` *(49 files)* | Full shadcn/ui component library — buttons, cards, tables, modals, inputs, dropdowns, toasts, etc. |
| `src/components/dashboard/DateRangePicker.tsx` | Date range filter for reports |
| `index.html` | Root HTML — SEO meta tags, favicon, OG tags |
| `src/pages/SettingsPage.tsx` | Admin profile & system settings |

**Core Logic:**
- `index.css` defines the entire design token system (CSS custom properties for colors, radii, shadows)
- `DashboardLayout.tsx` wraps every admin page with a consistent sidebar + header
- 49 shadcn/ui components provide accessible, production-grade UI building blocks

---

## 🏗️ Where Is What — Quick Reference

| Layer | Location |
|---|---|
| **Main HTML** | `index.html` |
| **Global CSS** | `src/index.css` + `tailwind.config.ts` |
| **App Router** | `src/App.tsx` |
| **Database Schema** | `supabase/migrations/initialize_schema.sql` |
| **Core Data Logic** | `src/hooks/useDashboardData.ts` |
| **Auth Logic** | `src/components/AdminGuard.tsx` + `src/lib/supabaseClient.ts` |
| **POS System** | `src/pages/CashierPage.tsx` |
| **Dashboard** | `src/pages/Index.tsx` |
| **Charts** | `src/components/dashboard/` |
| **UI Components** | `src/components/ui/` |

---

## ✅ Features Implemented (~50%)

### ✅ Done
- [x] Role-based Authentication (Admin vs Cashier)
- [x] Admin Login with hardcoded + Supabase auth
- [x] Protected admin routes (AdminGuard)
- [x] Landing page with dual portal entry
- [x] Dashboard overview with 4 KPI cards
- [x] Revenue trend chart (30-day)
- [x] Hourly sales chart
- [x] Store performance chart
- [x] Category pie chart
- [x] Top products leaderboard
- [x] AI-generated business insights
- [x] Real-time transaction feed
- [x] Cashier POS system (add products, record sales)
- [x] Product catalogue page
- [x] Inventory management with low-stock indicators
- [x] Store management page
- [x] Employee management page
- [x] CSV export on reports
- [x] Global search dialog
- [x] Notification system for alerts
- [x] Dark/light mode toggle
- [x] Settings page
- [x] Supabase database schema with RLS policies
- [x] Auto stock decrement trigger on sale
- [x] Full rebranding to RetailPulse

### 🚧 Remaining (50%)
- [ ] Live Supabase data seeding (currently showing demo data)
- [ ] Cashier shift reports
- [ ] Multi-store filtering in analytics
- [ ] Mobile-responsive cashier interface
- [ ] Role management for employees
- [ ] Email notifications for low stock
- [ ] PDF report generation
- [ ] Sales forecasting

---

## 🎤 Project Pitch Script (30 seconds)

> *"RetailPulse is a full-stack retail management system built with React, TypeScript, and Supabase. We've built a complete two-portal system — admins get a real-time analytics dashboard with sales trends, inventory alerts, and AI insights, while cashiers get a lightweight point-of-sale interface. The entire system is secured with role-based access control, and the database is hosted on Supabase with automatic stock management triggers. It's roughly 50% complete — the core architecture, authentication, UI, and analytics are fully functional. The remaining work is in connecting live data and adding advanced reporting. This project mirrors real enterprise retail software and was built from scratch using industry best practices."*
