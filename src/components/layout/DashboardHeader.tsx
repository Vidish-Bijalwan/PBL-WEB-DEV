import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { Bell, Download, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
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
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-64 border-2 border-foreground" 
            />
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="border-2 border-foreground hover:bg-accent"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="border-2 border-foreground hover:bg-accent"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Button className="border-2 border-foreground font-semibold">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
