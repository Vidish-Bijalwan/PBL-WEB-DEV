import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, CheckCheck, TrendingUp, AlertTriangle, Target, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: "success" | "warning" | "info" | "alert";
    icon: React.ElementType;
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "Revenue Milestone",
        description: "Manhattan Flagship exceeded $450K monthly target!",
        time: "5 min ago",
        read: false,
        type: "success",
        icon: TrendingUp,
    },
    {
        id: "2",
        title: "Low Stock Alert",
        description: "iPhone 15 Pro Max stock below reorder point (12 units left)",
        time: "18 min ago",
        read: false,
        type: "warning",
        icon: AlertTriangle,
    },
    {
        id: "3",
        title: "Target Achieved",
        description: "Downtown Seattle hit 106.1% of quarterly target",
        time: "1 hour ago",
        read: false,
        type: "success",
        icon: Target,
    },
    {
        id: "4",
        title: "Unusual Activity",
        description: "Spike in transactions detected at Beverly Hills store",
        time: "2 hours ago",
        read: true,
        type: "alert",
        icon: ShoppingCart,
    },
    {
        id: "5",
        title: "Weekly Report Ready",
        description: "Your weekly performance summary is ready to download",
        time: "3 hours ago",
        read: true,
        type: "info",
        icon: TrendingUp,
    },
];

export function NotificationDropdown() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const markRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const typeColors = {
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        alert: "bg-red-500/10 text-red-600 dark:text-red-400",
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-2 border-foreground hover:bg-accent relative"
                >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold bg-destructive text-destructive-foreground border-0">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 border-2 border-foreground" align="end">
                <div className="flex items-center justify-between p-4 border-b-2 border-foreground">
                    <h3 className="font-bold uppercase text-sm tracking-wide">
                        Notifications
                    </h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs font-semibold"
                            onClick={markAllRead}
                        >
                            <CheckCheck className="mr-1 h-3 w-3" />
                            Mark all read
                        </Button>
                    )}
                </div>
                <ScrollArea className="max-h-[400px]">
                    <div className="divide-y divide-border">
                        {notifications.map((notification) => (
                            <button
                                key={notification.id}
                                className={cn(
                                    "w-full flex items-start gap-3 p-4 text-left hover:bg-accent transition-colors",
                                    !notification.read && "bg-accent/50"
                                )}
                                onClick={() => markRead(notification.id)}
                            >
                                <div
                                    className={cn(
                                        "p-2 rounded-none mt-0.5",
                                        typeColors[notification.type]
                                    )}
                                >
                                    <notification.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm truncate">
                                            {notification.title}
                                        </p>
                                        {!notification.read && (
                                            <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                        {notification.description}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                                        {notification.time}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
