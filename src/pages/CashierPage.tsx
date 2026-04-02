import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, LogOut, User, Store, Clock, Plus, IndianRupee, CreditCard, Smartphone, ShieldCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["Electronics", "Apparel", "Home & Garden", "Sports", "Beauty", "Other"];

interface CashierProfile {
    id: string;
    name: string;
    role: string;
    store_id: string | null;
    stores?: { name: string } | null;
}

interface SaleRecord {
    id: string;
    amount: number;
    created_at: string;
    status: string;
    customer_name: string;
    product_name: string;
    category: string;
    cashier_id: string;
    store_id: string | null;
    payment_method: string;
}

// ─── Auth Form ──────────────────────────────────────────────────────────────

function AuthForm() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [mode, setMode] = useState<"login" | "register">("login");
    const [role, setRole] = useState<"cashier" | "admin">("cashier");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            toast({ variant: "destructive", title: "Login Failed", description: error.message });
        }
        setLoading(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast({ variant: "destructive", title: "Name Required", description: "Please enter your full name." });
            return;
        }
        setLoading(true);
        try {
            // Pass name & role as user_metadata — the DB trigger auto-creates the profile
            const { error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { name: name.trim(), role } },
            });
            if (authError) throw authError;

            toast({
                title: "Account Created!",
                description: `Welcome ${name.trim()}! Registered as ${role}. Please sign in.`,
            });
            setMode("login");
            setName("");
        } catch (err: unknown) {
            toast({ variant: "destructive", title: "Registration Failed", description: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f3ef] flex flex-col items-center justify-center p-6 font-dm-sans">
            <Button variant="ghost" onClick={() => navigate("/")} className="absolute top-6 left-6 font-bold uppercase text-xs border-2 border-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <Card className="w-full max-w-md border-2 border-foreground shadow-none rounded-none">
                <CardHeader className="space-y-1 text-center border-b-2 border-foreground pb-6">
                    <div className="mx-auto bg-foreground h-12 w-12 flex items-center justify-center mb-4">
                        <ShoppingBag className="text-background h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tight uppercase">Staff Portal</CardTitle>

                    {/* Mode toggle */}
                    <div className="flex border-2 border-foreground mt-4">
                        <button
                            onClick={() => setMode("login")}
                            className={cn("flex-1 py-2 text-xs font-black uppercase transition-colors",
                                mode === "login" ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-accent"
                            )}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMode("register")}
                            className={cn("flex-1 py-2 text-xs font-black uppercase transition-colors",
                                mode === "register" ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-accent"
                            )}
                        >
                            Register
                        </button>
                    </div>
                </CardHeader>

                <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
                    <CardContent className="space-y-4 pt-6">
                        {mode === "register" && (
                            <>
                                {/* Name field (only on register) */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase">Full Name</Label>
                                    <Input
                                        placeholder="e.g. Ayush Rawat"
                                        className="border-2 border-foreground rounded-none"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Role selector */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase">Register As</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setRole("cashier")}
                                            className={cn(
                                                "flex flex-col items-center gap-2 p-4 border-2 transition-colors",
                                                role === "cashier"
                                                    ? "border-foreground bg-foreground text-background"
                                                    : "border-foreground bg-background hover:bg-accent"
                                            )}
                                        >
                                            <ShoppingBag className="h-5 w-5" />
                                            <span className="text-[10px] font-black uppercase">Cashier</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole("admin")}
                                            className={cn(
                                                "flex flex-col items-center gap-2 p-4 border-2 transition-colors",
                                                role === "admin"
                                                    ? "border-foreground bg-foreground text-background"
                                                    : "border-foreground bg-background hover:bg-accent"
                                            )}
                                        >
                                            <ShieldCheck className="h-5 w-5" />
                                            <span className="text-[10px] font-black uppercase">Admin</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase">Email</Label>
                            <Input
                                type="email"
                                placeholder="name@store.com"
                                className="border-2 border-foreground rounded-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase">Password</Label>
                            <Input
                                type="password"
                                placeholder={mode === "register" ? "Min. 6 characters" : ""}
                                className="border-2 border-foreground rounded-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button type="submit" disabled={loading} className="w-full h-12 font-black uppercase tracking-wider">
                            {loading ? "Please wait..." : mode === "login" ? "Sign In" : `Create ${role} Account`}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

// ─── Main Cashier Page ────────────────────────────────────────────────────────

const CashierPage = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<CashierProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Form State
    const [customerName, setCustomerName] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "upi">("cash");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Today's Sales State
    const [todaySales, setTodaySales] = useState<SaleRecord[]>([]);

    const fetchTodaySales = async (cashierId: string) => {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq("cashier_id", cashierId)
            .gte("created_at", startOfToday.toISOString())
            .order("created_at", { ascending: false });
        if (!error) setTodaySales(data || []);
    };

    const fetchProfile = useCallback(async (userId: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*, stores(name)")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching profile:", error);
            toast({ variant: "destructive", title: "Profile Not Found", description: "Your account is not linked to a profile. Please register first." });
        } else {
            setProfile(data);
            fetchTodaySales(data.id);
        }
        setLoading(false);
    }, [toast]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchProfile(session.user.id);
            else setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchProfile(session.user.id);
            else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [fetchProfile]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleAddSale = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) {
            toast({ variant: "destructive", title: "Access Denied", description: "Your account is not linked to a profile." });
            return;
        }
        if (!productName || !category || !amount) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please fill all required fields." });
            return;
        }

        setIsSubmitting(true);
        try {
            const { data, error } = await supabase
                .from("transactions")
                .insert({
                    cashier_id: profile.id,
                    store_id: profile.store_id || null,
                    customer_name: customerName || "Walk-in",
                    product_name: productName,
                    category: category,
                    amount: Number(amount),
                    payment_method: paymentMethod,
                    status: "completed",
                })
                .select()
                .single();

            if (error) {
                toast({ variant: "destructive", title: "Error", description: error.message });
                console.error("Submission Error:", error);
            } else {
                toast({ title: "Sale Recorded! ✓", description: `₹${amount} for ${productName}` });
                setProductName("");
                setCustomerName("");
                setAmount("");
                setCategory("");
                setTodaySales([data, ...todaySales]);
            }
        } catch (err: unknown) {
            console.error("Unexpected Error:", err);
            toast({ variant: "destructive", title: "System Error", description: err instanceof Error ? err.message : "Unknown error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="h-screen flex items-center justify-center font-bold uppercase tracking-tighter">Loading System...</div>;
    }

    if (!session) return <AuthForm />;

    const shiftTotal = todaySales.reduce((acc, s) => acc + (s.status === 'completed' ? Number(s.amount) : 0), 0);

    return (
        <div className="min-h-screen bg-[#f4f3ef] font-dm-sans text-foreground">
            {/* Header */}
            <header className="bg-background border-b-2 border-foreground sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Store className="h-5 w-5" />
                            <span className="font-bold uppercase tracking-tight">{profile?.stores?.name || "Store"}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-muted-foreground border-l-2 border-foreground/10 pl-6">
                            <User className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase">
                                {profile?.name || "Unknown"} •{" "}
                                <Badge variant="outline" className="border-foreground text-[9px] uppercase font-black ml-1">
                                    {profile?.role}
                                </Badge>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Shift Total</span>
                            <span className="font-mono font-bold text-lg">₹{shiftTotal.toLocaleString()}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="border-2 border-foreground font-bold uppercase text-xs h-10">
                            <LogOut className="mr-2 h-4 w-4" /> End Shift
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sale Form */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-2 border-foreground shadow-none rounded-none">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold uppercase flex items-center gap-2">
                                <Plus className="h-5 w-5" /> New Transaction
                            </CardTitle>
                        </CardHeader>
                        <form onSubmit={handleAddSale}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase">Customer Name</Label>
                                    <Input placeholder="Walk-in" className="border-2 border-foreground rounded-none" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase">Product Name</Label>
                                    <Input placeholder="Enter product..." className="border-2 border-foreground rounded-none" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase">Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="border-2 border-foreground rounded-none">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase">Amount (₹)</Label>
                                    <Input type="number" placeholder="0.00" className="border-2 border-foreground rounded-none font-mono text-lg font-bold" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                                </div>
                                <div className="space-y-3 pt-2">
                                    <Label className="text-xs font-bold uppercase">Payment Method</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(["cash", "card", "upi"] as const).map((m) => (
                                            <Button key={m} type="button" variant="outline"
                                                className={cn("h-16 border-2 border-foreground flex flex-col gap-1 rounded-none", paymentMethod === m && "bg-foreground text-background")}
                                                onClick={() => setPaymentMethod(m)}>
                                                {m === "cash" ? <IndianRupee className="h-4 w-4" /> : m === "card" ? <CreditCard className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                                                <span className="text-[10px] uppercase font-bold">{m}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isSubmitting} className="w-full h-14 font-bold uppercase tracking-wider text-lg rounded-none">
                                    {isSubmitting ? "Recording..." : "Add Sale"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                {/* Sales List */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-2 border-foreground shadow-none rounded-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold uppercase flex items-center gap-2">
                                <Clock className="h-5 w-5" /> Today's Sales
                            </CardTitle>
                            <Badge variant="outline" className="border-foreground font-bold uppercase text-[10px] rounded-none">
                                {todaySales.length} Transactions
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-foreground">
                                <Table>
                                    <TableHeader className="bg-muted/50 border-b-2 border-foreground">
                                        <TableRow className="border-none">
                                            <TableHead className="font-bold uppercase text-xs text-foreground">Time</TableHead>
                                            <TableHead className="font-bold uppercase text-xs text-foreground">Customer</TableHead>
                                            <TableHead className="font-bold uppercase text-xs text-foreground">Product</TableHead>
                                            <TableHead className="font-bold uppercase text-xs text-foreground text-right">Amount</TableHead>
                                            <TableHead className="font-bold uppercase text-xs text-foreground text-center">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {todaySales.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground uppercase font-bold text-xs">
                                                    No sales recorded yet today
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            todaySales.map((sale) => (
                                                <TableRow key={sale.id} className="border-b border-foreground/10 hover:bg-muted/30 transition-colors">
                                                    <TableCell className="font-mono text-xs">
                                                        {new Date(sale.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </TableCell>
                                                    <TableCell className="font-bold uppercase text-[10px]">{sale.customer_name}</TableCell>
                                                    <TableCell className="font-semibold">{sale.product_name}</TableCell>
                                                    <TableCell className="text-right font-mono font-bold">₹{Number(sale.amount).toLocaleString()}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge className={cn("uppercase text-[9px] font-bold border-0 rounded-none",
                                                            sale.status === "completed" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                                                        )}>
                                                            {sale.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default CashierPage;
