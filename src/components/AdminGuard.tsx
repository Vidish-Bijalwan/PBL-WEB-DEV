import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

/**
 * AdminGuard — wraps any admin-only route.
 * - If the user is not logged in → redirect to /cashier (login)
 * - If the user is a cashier → redirect to /cashier (their own UI)
 * - If the user is an admin → render children
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<"loading" | "admin" | "cashier" | "unauthenticated">("loading");

    useEffect(() => {
        const check = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setStatus("unauthenticated");
                return;
            }

            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single();

            if (profile?.role === "admin") {
                setStatus("admin");
            } else {
                // cashier or no profile → send to cashier UI
                setStatus("cashier");
            }
        };
        check();
    }, []);

    if (status === "loading") {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (status === "unauthenticated" || status === "cashier") {
        return <Navigate to="/cashier" replace />;
    }

    return <>{children}</>;
}
