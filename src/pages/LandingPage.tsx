import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ShieldCheck, Sparkles, Store } from "lucide-react";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f4f3ef] flex flex-col items-center justify-center p-6 font-dm-sans text-foreground">
            {/* Logo/Brand Section */}
            <div className="mb-12 text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Retail Intelligence System</span>
                </div>
                <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">
                    Retail<span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60 italic">Pulse</span>
                </h1>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">The future of retail management, today.</p>
            </div>

            {/* Role Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Admin Card */}
                <Card
                    className="group relative border-4 border-foreground shadow-none rounded-none cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-background overflow-hidden animate-slide-in"
                    onClick={() => navigate("/admin")}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ShieldCheck className="h-24 w-24" />
                    </div>
                    <CardContent className="p-8 h-full flex flex-col justify-between items-start">
                        <div>
                            <div className="h-14 w-14 bg-foreground flex items-center justify-center mb-6">
                                <ShieldCheck className="text-background h-8 w-8" />
                            </div>
                            <h3 className="text-3xl font-black uppercase mb-4 leading-tight italic">Admin Dashboard</h3>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                                    <div className="h-1 w-1 bg-foreground rounded-full" /> Full Analytics Control
                                </li>
                                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                                    <div className="h-1 w-1 bg-foreground rounded-full" /> Inventory Management
                                </li>
                                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                                    <div className="h-1 w-1 bg-foreground rounded-full" /> AI Business Insights
                                </li>
                            </ul>
                        </div>
                        <Button className="w-full h-14 font-black uppercase text-lg tracking-wider border-2 border-foreground group-hover:bg-accent group-hover:text-foreground">
                            Enter Admin Portal
                        </Button>
                    </CardContent>
                </Card>

                {/* Cashier Card */}
                <Card
                    className="group relative border-4 border-foreground shadow-none rounded-none cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] bg-background overflow-hidden animate-slide-in [animation-delay:150ms]"
                    onClick={() => navigate("/cashier")}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ShoppingBag className="h-24 w-24" />
                    </div>
                    <CardContent className="p-8 h-full flex flex-col justify-between items-start">
                        <div>
                            <div className="h-14 w-14 bg-emerald-500 border-2 border-foreground flex items-center justify-center mb-6">
                                <ShoppingBag className="text-white h-8 w-8" />
                            </div>
                            <h3 className="text-3xl font-black uppercase mb-4 leading-tight italic">Cashier Portal</h3>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                                    <div className="h-1 w-1 bg-foreground rounded-full" /> Fast Sale Entry
                                </li>
                                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                                    <div className="h-1 w-1 bg-foreground rounded-full" /> Shift Performance Tracking
                                </li>
                                <li className="flex items-center gap-2 text-xs font-bold uppercase">
                                    <div className="h-1 w-1 bg-foreground rounded-full" /> Real-time Cloud Sync
                                </li>
                            </ul>
                        </div>
                        <Button variant="outline" className="w-full h-14 font-black uppercase text-lg tracking-wider border-2 border-foreground group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            Enter Staff Portal
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Meta */}
            <div className="mt-16 flex items-center gap-6 animate-fade-in [animation-delay:300ms]">
                <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-black tracking-widest">
                    <Store className="h-4 w-4" />
                    <span>Multi-Store Ready</span>
                </div>
                <div className="h-1 w-1 bg-muted-foreground rounded-full" />
                <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-black tracking-widest">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Encrypted Gateway</span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
