import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Store, Package, Users, LayoutDashboard, TrendingUp, BarChart3, Clock, Settings } from "lucide-react";
import { topProducts, storePerformance, employeePerformance } from "@/data/mockData";

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const pages = [
    { name: "Dashboard Overview", path: "/", icon: LayoutDashboard },
    { name: "Sales Analytics", path: "/sales", icon: TrendingUp },
    { name: "Store Performance", path: "/stores", icon: Store },
    { name: "Product Analytics", path: "/products", icon: Package },
    { name: "Employee Performance", path: "/employees", icon: Users },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "Real-time Monitor", path: "/realtime", icon: Clock },
    { name: "Settings", path: "/settings", icon: Settings },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, onOpenChange]);

    const handleSelect = (path: string) => {
        navigate(path);
        onOpenChange(false);
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search pages, products, stores, employees..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Pages">
                    {pages.map((page) => (
                        <CommandItem
                            key={page.path}
                            onSelect={() => handleSelect(page.path)}
                            className="cursor-pointer"
                        >
                            <page.icon className="mr-2 h-4 w-4" />
                            <span>{page.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Products">
                    {topProducts.map((product) => (
                        <CommandItem
                            key={product.id}
                            onSelect={() => handleSelect("/products")}
                            className="cursor-pointer"
                        >
                            <Package className="mr-2 h-4 w-4" />
                            <span>{product.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground font-mono">{product.sku}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Stores">
                    {storePerformance.map((store) => (
                        <CommandItem
                            key={store.id}
                            onSelect={() => handleSelect("/stores")}
                            className="cursor-pointer"
                        >
                            <Store className="mr-2 h-4 w-4" />
                            <span>{store.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{store.city}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Employees">
                    {employeePerformance.map((emp) => (
                        <CommandItem
                            key={emp.id}
                            onSelect={() => handleSelect("/employees")}
                            className="cursor-pointer"
                        >
                            <Users className="mr-2 h-4 w-4" />
                            <span>{emp.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{emp.store}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
