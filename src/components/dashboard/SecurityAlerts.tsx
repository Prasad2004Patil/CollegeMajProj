
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Alert = {
  id: string;
  title: string;
  time: string;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  resolved: boolean;
};

// Mock data for security alerts
const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    title: "Unusual purchase pattern detected",
    time: "10 minutes ago",
    severity: "critical",
    source: "Transaction Monitoring",
    resolved: false,
  },
  {
    id: "alert-2",
    title: "Multiple failed login attempts",
    time: "25 minutes ago",
    severity: "high",
    source: "Authentication Service",
    resolved: false,
  },
  {
    id: "alert-3",
    title: "Suspicious API access pattern",
    time: "1 hour ago",
    severity: "medium",
    source: "API Gateway",
    resolved: false,
  },
  {
    id: "alert-4",
    title: "Unusual data access pattern",
    time: "2 hours ago",
    severity: "low",
    source: "Database Monitor",
    resolved: true,
  },
  {
    id: "alert-5",
    title: "Potential data exfiltration attempt",
    time: "3 hours ago",
    severity: "critical",
    source: "DLP System",
    resolved: true,
  },
];

export function SecurityAlerts() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-security-blue">Security Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-3">
          {mockAlerts.map((alert) => (
            <li 
              key={alert.id}
              className={cn(
                "p-3 rounded-md transition-colors",
                alert.resolved 
                  ? "bg-security-navy" 
                  : alert.severity === "critical"
                    ? "bg-security-alert/10"
                    : alert.severity === "high"
                      ? "bg-security-amber/10"
                      : "bg-security-navy"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {alert.resolved ? (
                      <CheckCircle className="h-5 w-5 text-security-teal" />
                    ) : (
                      <AlertTriangle 
                        className={cn(
                          "h-5 w-5",
                          alert.severity === "critical" 
                            ? "text-security-alert" 
                            : alert.severity === "high" 
                              ? "text-security-amber" 
                              : "text-security-teal"
                        )} 
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{alert.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          alert.severity === "critical" 
                            ? "border-security-alert text-security-alert" 
                            : alert.severity === "high" 
                              ? "border-security-amber text-security-amber" 
                              : alert.severity === "medium"
                                ? "border-security-purple text-security-purple"
                                : "border-security-teal text-security-teal"
                        )}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      <span>{alert.source}</span>
                      <span className="mx-2">•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-security-blue hover:bg-security-blue/10"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button variant="outline" className="w-full text-security-blue border-security-blue/20 hover:bg-security-blue/10">
          View All Alerts
        </Button>
      </CardFooter>
    </Card>
  );
}
