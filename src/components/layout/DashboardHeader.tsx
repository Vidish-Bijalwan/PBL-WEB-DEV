import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { SearchDialog } from "@/components/dashboard/SearchDialog";
import { NotificationDropdown } from "@/components/dashboard/NotificationDropdown";
import { Download, RefreshCw, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useExport } from "@/hooks/useExport";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { exportData } = useExport();

  return (
    <header className="border-b-2 border-foreground bg-background sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="border-2 border-foreground hover:bg-accent" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />

          <Button
            variant="outline"
            className="border-2 border-foreground font-semibold hover:bg-accent hidden md:flex"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="ml-4 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

          <Button
            variant="outline"
            size="icon"
            className="border-2 border-foreground hover:bg-accent"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="border-2 border-foreground hover:bg-accent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <NotificationDropdown />

          <Button
            className="border-2 border-foreground font-semibold"
            onClick={() => exportData("dashboard")}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
