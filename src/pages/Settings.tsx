
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, Lock, RefreshCw, Server, Key } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <PageContainer
        title="Settings"
        description="Configure your security monitoring system"
      >
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="grid grid-cols-4 w-[600px] bg-security-navy">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="model">AI Model</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-security-blue">General Settings</CardTitle>
                <CardDescription>Manage your account and system preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="admin@shieldbrain.ai" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="securityadmin" />
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
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
                  <Select defaultValue="dark">
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
                  <Switch id="telemetry" defaultChecked />
                </div>
                
                <div className="pt-4">
                  <Button className="bg-security-blue hover:bg-security-blue/80">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
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
                          <Switch id="critical-email" defaultChecked />
                          <Label htmlFor="critical-email" className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="critical-sms" defaultChecked />
                          <Label htmlFor="critical-sms" className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="critical-push" defaultChecked />
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
                          <Switch id="high-email" defaultChecked />
                          <Label htmlFor="high-email" className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="high-sms" />
                          <Label htmlFor="high-sms" className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="high-push" defaultChecked />
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
                          <Switch id="medium-email" defaultChecked />
                          <Label htmlFor="medium-email" className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="medium-sms" />
                          <Label htmlFor="medium-sms" className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="medium-push" />
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
                          <Switch id="low-email" />
                          <Label htmlFor="low-email" className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="low-sms" />
                          <Label htmlFor="low-sms" className="text-sm">SMS</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="low-push" />
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
                        <Select defaultValue="daily">
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
                        <Select defaultValue="pdf">
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
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-security-blue">Security Settings</CardTitle>
                <CardDescription>Configure encryption and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lock className="h-5 w-5 text-security-blue" />
                    Authentication
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all account logins
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="session-timeout"
                        defaultValue={[30]}
                        max={120}
                        step={5}
                        className="w-[300px]"
                      />
                      <span className="text-sm font-medium">30 min</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-security-blue" />
                    Encryption
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Hybrid Encryption</Label>
                        <p className="text-sm text-muted-foreground">
                          Use RSA + AES for enhanced security
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="encryption-method">Symmetric Algorithm</Label>
                      <Select defaultValue="aes-256">
                        <SelectTrigger id="encryption-method">
                          <SelectValue placeholder="Select algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aes-256">AES-256</SelectItem>
                          <SelectItem value="aes-128">AES-128</SelectItem>
                          <SelectItem value="blowfish">Blowfish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="key-rotation">Key Rotation Period</Label>
                      <Select defaultValue="30days">
                        <SelectTrigger id="key-rotation">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">7 Days</SelectItem>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="180days">180 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Key className="h-5 w-5 text-security-blue" />
                    API Security
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="api-key" 
                        value="sk_live_51ABcDeFgHiJkLmNo7PqRsTuV...." 
                        readOnly 
                        className="font-mono text-xs"
                      />
                      <Button variant="outline" className="shrink-0">
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This key provides access to the ShieldBrain API. Keep it secure.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>API Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit API requests to prevent abuse
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="rate-limit"
                        defaultValue={[100]}
                        max={500}
                        step={10}
                        className="w-[300px]"
                      />
                      <span className="text-sm font-medium">100</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-security-blue hover:bg-security-blue/80">
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="model" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-security-blue">AI Model Settings</CardTitle>
                <CardDescription>Configure machine learning models for anomaly detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Server className="h-5 w-5 text-security-blue" />
                    Deployment
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cloud-platform">Cloud Platform</Label>
                    <Select defaultValue="aws">
                      <SelectTrigger id="cloud-platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws">AWS</SelectItem>
                        <SelectItem value="gcp">Google Cloud</SelectItem>
                        <SelectItem value="azure">Microsoft Azure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="compute-type">Compute Type</Label>
                    <Select defaultValue="gpu">
                      <SelectTrigger id="compute-type">
                        <SelectValue placeholder="Select compute type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpu">GPU (Recommended)</SelectItem>
                        <SelectItem value="cpu">CPU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instance-size">Instance Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="instance-size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (2 vCPU, 4GB RAM)</SelectItem>
                        <SelectItem value="medium">Medium (4 vCPU, 16GB RAM)</SelectItem>
                        <SelectItem value="large">Large (8 vCPU, 32GB RAM)</SelectItem>
                        <SelectItem value="xlarge">XLarge (16 vCPU, 64GB RAM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">GNN Configuration</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gnn-layers">Number of GNN Layers</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="gnn-layers"
                        defaultValue={[3]}
                        max={6}
                        step={1}
                        className="w-[300px]"
                      />
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gnn-threshold">Anomaly Detection Threshold</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="gnn-threshold"
                        defaultValue={[0.75]}
                        min={0.5}
                        max={0.99}
                        step={0.01}
                        className="w-[300px]"
                      />
                      <span className="text-sm font-medium">0.75</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Real-time Graph Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Update graph structure in real-time
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">LSTM Configuration</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sequence-length">Sequence Length</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="sequence-length"
                        defaultValue={[128]}
                        min={32}
                        max={512}
                        step={32}
                        className="w-[300px]"
                      />
                      <span className="text-sm font-medium">128</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lstm-units">LSTM Units</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="lstm-units"
                        defaultValue={[256]}
                        min={64}
                        max={512}
                        step={64}
                        className="w-[300px]"
                      />
                      <span className="text-sm font-medium">256</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prediction-window">Prediction Window (minutes)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="prediction-window"
                        defaultValue={[15]}
                        min={5}
                        max={60}
                        step={5}
                        className="w-[300px]"
                      />
                      <span className="text-sm font-medium">15</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-security-blue hover:bg-security-blue/80">
                    Save Model Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </Layout>
  );
};

export default Settings;
