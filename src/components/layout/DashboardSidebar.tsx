import { 
  LayoutDashboard, 
  TrendingUp, 
  Store, 
  Package, 
  Users, 
  Settings,
  BarChart3,
  Clock
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Sales Analytics", url: "/sales", icon: TrendingUp },
  { title: "Stores", url: "/stores", icon: Store },
  { title: "Products", url: "/products", icon: Package },
  { title: "Employees", url: "/employees", icon: Users },
];

const secondaryNavItems = [
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Real-time", url: "/realtime", icon: Clock },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r-2 border-foreground">
      <SidebarHeader className="border-b-2 border-foreground p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-foreground flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-background" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg tracking-tight">RETAIL</h1>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Sales Dashboard
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold uppercase text-xs tracking-wider px-4">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent transition-colors"
                      activeClassName="bg-foreground text-background hover:bg-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <span className="font-semibold">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold uppercase text-xs tracking-wider px-4">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent transition-colors"
                      activeClassName="bg-foreground text-background hover:bg-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <span className="font-semibold">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t-2 border-foreground p-4">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold">Last updated</p>
            <p className="font-mono">Feb 1, 2026 • 10:42 AM</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
