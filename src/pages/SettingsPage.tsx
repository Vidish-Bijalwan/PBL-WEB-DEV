import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Database, Globe } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Configure your dashboard preferences"
    >
      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold">Name</Label>
                <Input id="name" defaultValue="Admin User" className="border-2 border-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input id="email" type="email" defaultValue="admin@retail.com" className="border-2 border-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="font-semibold">Role</Label>
              <Input id="role" defaultValue="Dashboard Administrator" disabled className="border-2 border-foreground bg-muted" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Daily Summary</p>
                <p className="text-sm text-muted-foreground">Receive daily sales summary via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-foreground" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Target Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when stores hit targets</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-foreground" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Anomaly Detection</p>
                <p className="text-sm text-muted-foreground">Alert on unusual sales patterns</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Display
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Compact Mode</p>
                <p className="text-sm text-muted-foreground">Use condensed layout for tables</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-foreground" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Auto-refresh</p>
                <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Data Settings */}
        <Card className="border-2 border-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Data Retention</p>
                <p className="text-sm text-muted-foreground">Keep historical data for 2 years</p>
              </div>
              <Button variant="outline" className="border-2 border-foreground font-semibold">
                Configure
              </Button>
            </div>
            <Separator className="bg-foreground" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Export Data</p>
                <p className="text-sm text-muted-foreground">Download all your analytics data</p>
              </div>
              <Button variant="outline" className="border-2 border-foreground font-semibold">
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-2 border-foreground font-semibold">
            Cancel
          </Button>
          <Button className="font-semibold">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
