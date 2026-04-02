import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // ── Hardcoded demo admin ──────────────────────────────────────────────
    const ADMIN_EMAIL = "admin@retailpulse.com";
    const ADMIN_PASSWORD = "Admin@123";
    // ─────────────────────────────────────────────────────────────────────

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Hardcoded admin bypass
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem("retailpulse_admin", "true");
            toast({ title: "Welcome, Admin!", description: "Redirecting to dashboard..." });
            navigate("/admin");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;

            // Verify the logged-in user is actually an admin
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();

            if (profileError || !profile) {
                await supabase.auth.signOut();
                throw new Error("Your account profile was not found.");
            }

            if (profile.role !== "admin") {
                await supabase.auth.signOut();
                throw new Error("Access denied. This portal is for administrators only.");
            }

            toast({ title: "Welcome back!", description: "Redirecting to dashboard..." });
            navigate("/admin");
        } catch (err: unknown) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: err instanceof Error ? err.message : "An unexpected error occurred.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f3ef] flex flex-col items-center justify-center p-6 font-dm-sans">
            {/* Header */}
            <div className="mb-10 text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background mb-4">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Administrator Access</span>
                </div>
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">
                    Retail<span className="italic text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">Pulse</span>
                </h1>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Admin Portal Sign In</p>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none animate-slide-in">
                <CardHeader className="pb-4">
                    <div className="h-14 w-14 bg-foreground flex items-center justify-center mb-4">
                        <ShieldCheck className="text-background h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Admin Dashboard</CardTitle>
                    <CardDescription className="font-bold uppercase text-xs tracking-wider">
                        Sign in with your administrator credentials
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-black uppercase tracking-wider">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@yourstore.com"
                                required
                                className="h-12 border-2 border-foreground rounded-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-black uppercase tracking-wider">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="h-12 border-2 border-foreground rounded-none font-medium pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 font-black uppercase text-base tracking-wider rounded-none border-2 border-foreground mt-2"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to Dashboard"}
                        </Button>
                    </form>

                    <div className="mt-6 pt-5 border-t-2 border-foreground/20">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/")}
                            className="w-full font-bold uppercase text-xs tracking-wider text-muted-foreground hover:text-foreground rounded-none"
                        >
                            ← Back to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <p className="mt-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Not an admin? <button onClick={() => navigate("/cashier")} className="underline hover:text-foreground transition-colors">Staff Login →</button>
            </p>
        </div>
    );
};

export default AdminLoginPage;
