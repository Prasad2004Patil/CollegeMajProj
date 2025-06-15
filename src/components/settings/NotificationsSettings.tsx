
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Bell, RefreshCw } from "lucide-react";

export const NotificationsSettings = () => {
  const [criticalEmail, setCriticalEmail] = useState(true);
  const [criticalSms, setCriticalSms] = useState(true);
  const [criticalPush, setCriticalPush] = useState(true);
  const [highEmail, setHighEmail] = useState(true);
  const [highSms, setHighSms] = useState(false);
  const [highPush, setHighPush] = useState(true);
  const [mediumEmail, setMediumEmail] = useState(true);
  const [mediumSms, setMediumSms] = useState(false);
  const [mediumPush, setMediumPush] = useState(false);
  const [lowEmail, setLowEmail] = useState(false);
  const [lowSms, setLowSms] = useState(false);
  const [lowPush, setLowPush] = useState(false);
  const [reportFrequency, setReportFrequency] = useState("daily");
  const [reportFormat, setReportFormat] = useState("pdf");

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-security-blue">Notification Settings</CardTitle>
        <CardDescription>Configure how and when you receive alerts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-security-blue" />
            Alert Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Critical Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  High priority security incidents
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="critical-email" checked={criticalEmail} onCheckedChange={setCriticalEmail} />
                  <Label htmlFor="critical-email" className="text-sm">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="critical-sms" checked={criticalSms} onCheckedChange={setCriticalSms} />
                  <Label htmlFor="critical-sms" className="text-sm">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="critical-push" checked={criticalPush} onCheckedChange={setCriticalPush} />
                  <Label htmlFor="critical-push" className="text-sm">Push</Label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>High Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Important but non-critical issues
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="high-email" checked={highEmail} onCheckedChange={setHighEmail} />
                  <Label htmlFor="high-email" className="text-sm">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="high-sms" checked={highSms} onCheckedChange={setHighSms} />
                  <Label htmlFor="high-sms" className="text-sm">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="high-push" checked={highPush} onCheckedChange={setHighPush} />
                  <Label htmlFor="high-push" className="text-sm">Push</Label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Medium Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Standard security notifications
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="medium-email" checked={mediumEmail} onCheckedChange={setMediumEmail} />
                  <Label htmlFor="medium-email" className="text-sm">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="medium-sms" checked={mediumSms} onCheckedChange={setMediumSms} />
                  <Label htmlFor="medium-sms" className="text-sm">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="medium-push" checked={mediumPush} onCheckedChange={setMediumPush} />
                  <Label htmlFor="medium-push" className="text-sm">Push</Label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Informational notices
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="low-email" checked={lowEmail} onCheckedChange={setLowEmail} />
                  <Label htmlFor="low-email" className="text-sm">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="low-sms" checked={lowSms} onCheckedChange={setLowSms} />
                  <Label htmlFor="low-sms" className="text-sm">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="low-push" checked={lowPush} onCheckedChange={setLowPush} />
                  <Label htmlFor="low-push" className="text-sm">Push</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-security-blue" />
            Digest Reports
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-frequency">Report Frequency</Label>
                <Select value={reportFrequency} onValueChange={setReportFrequency}>
                  <SelectTrigger id="report-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-format">Report Format</Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger id="report-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button className="bg-security-blue hover:bg-security-blue/80">
            Save Notification Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
