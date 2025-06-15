
import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const GeneralSettings = () => {
  const { theme, setTheme } = useTheme();

  const [email, setEmail] = useState(
    () => localStorage.getItem("settings:email") || "admin@shieldbrain.ai"
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem("settings:username") || "securityadmin"
  );
  const [timezone, setTimezone] = useState(
    () => localStorage.getItem("settings:timezone") || "utc"
  );
  const [telemetry, setTelemetry] = useState(() => {
    const saved = localStorage.getItem("settings:telemetry");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const handleSave = () => {
    localStorage.setItem("settings:email", email);
    localStorage.setItem("settings:username", username);
    localStorage.setItem("settings:timezone", timezone);
    localStorage.setItem("settings:telemetry", JSON.stringify(telemetry));
    toast.success("Settings have been saved.");
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-security-blue">General Settings</CardTitle>
        <CardDescription>Manage your account and system preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
              <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
              <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
              <SelectItem value="cet">CET (Central European Time)</SelectItem>
              <SelectItem value="jst">JST (Japan Standard Time)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="telemetry">Anonymous Usage Data</Label>
            <p className="text-sm text-muted-foreground">
              Help improve the product by sharing anonymous usage data
            </p>
          </div>
          <Switch id="telemetry" checked={telemetry} onCheckedChange={setTelemetry} />
        </div>
        
        <div className="pt-4">
          <Button
            className="bg-security-blue hover:bg-security-blue/80"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
