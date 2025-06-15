
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Key } from "lucide-react";

export const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState([30]);
  const [hybridEncryption, setHybridEncryption] = useState(true);
  const [symmetricAlgorithm, setSymmetricAlgorithm] = useState("aes-256");
  const [keyRotationPeriod, setKeyRotationPeriod] = useState("30days");
  const [apiKey, setApiKey] = useState("sk_live_51ABcDeFgHiJkLmNo7PqRsTuV....");
  const [apiRateLimiting, setApiRateLimiting] = useState(true);
  const [rateLimit, setRateLimit] = useState([100]);

  return (
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
            <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="session-timeout"
                value={sessionTimeout}
                onValueChange={setSessionTimeout}
                max={120}
                step={5}
                className="w-[300px]"
              />
              <span className="text-sm font-medium">{sessionTimeout[0]} min</span>
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
              <Switch checked={hybridEncryption} onCheckedChange={setHybridEncryption} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="encryption-method">Symmetric Algorithm</Label>
              <Select value={symmetricAlgorithm} onValueChange={setSymmetricAlgorithm}>
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
              <Select value={keyRotationPeriod} onValueChange={setKeyRotationPeriod}>
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
                value={apiKey} 
                readOnly 
                className="font-mono text-xs"
              />
              <Button variant="outline" className="shrink-0" onClick={() => setApiKey('sk_live_' + Math.random().toString(36).substring(2))}>
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
            <Switch checked={apiRateLimiting} onCheckedChange={setApiRateLimiting} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="rate-limit"
                value={rateLimit}
                onValueChange={setRateLimit}
                max={500}
                step={10}
                className="w-[300px]"
              />
              <span className="text-sm font-medium">{rateLimit[0]}</span>
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
  );
};
