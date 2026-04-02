import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import SalesPage from "./pages/SalesPage";
import StoresPage from "./pages/StoresPage";
import ProductsPage from "./pages/ProductsPage";
import EmployeesPage from "./pages/EmployeesPage";
import ReportsPage from "./pages/ReportsPage";
import RealtimePage from "./pages/RealtimePage";
import SettingsPage from "./pages/SettingsPage";
import InventoryPage from "./pages/InventoryPage";
import CashierPage from "./pages/CashierPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/AdminLoginPage";
import { AdminGuard } from "./components/AdminGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Admin login — public, but verifies role */}
            <Route path="/admin-login" element={<AdminLoginPage />} />
            {/* Cashier-facing route — no guard needed, has its own auth */}
            <Route path="/cashier" element={<CashierPage />} />
            {/* Admin-only routes — cashiers are redirected to /cashier */}
            <Route path="/admin" element={<AdminGuard><Index /></AdminGuard>} />
            <Route path="/sales" element={<AdminGuard><SalesPage /></AdminGuard>} />
            <Route path="/stores" element={<AdminGuard><StoresPage /></AdminGuard>} />
            <Route path="/products" element={<AdminGuard><ProductsPage /></AdminGuard>} />
            <Route path="/employees" element={<AdminGuard><EmployeesPage /></AdminGuard>} />
            <Route path="/inventory" element={<AdminGuard><InventoryPage /></AdminGuard>} />
            <Route path="/reports" element={<AdminGuard><ReportsPage /></AdminGuard>} />
            <Route path="/realtime" element={<AdminGuard><RealtimePage /></AdminGuard>} />
            <Route path="/settings" element={<AdminGuard><SettingsPage /></AdminGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
