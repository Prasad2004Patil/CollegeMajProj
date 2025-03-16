
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatusCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  pulseEffect?: boolean;
};

export function StatusCard({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
  pulseEffect = false,
}: StatusCardProps) {
  return (
    <Card className={cn("overflow-hidden border-0 shadow-md", className, {
      "animate-pulse-alert": pulseEffect
    })}>
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start mb-3">
          <div className="text-muted-foreground text-sm font-medium">{title}</div>
          <div className="text-security-blue">{icon}</div>
        </div>
        
        <div className="text-2xl font-bold mb-2">{value}</div>
        
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
        
        {trend && trendValue && (
          <div className="flex items-center mt-3 text-xs">
            <span 
              className={cn("font-medium", {
                "text-green-500": trend === "up",
                "text-security-alert": trend === "down",
                "text-gray-400": trend === "neutral",
              })}
            >
              {trend === "up" && "↑ "}
              {trend === "down" && "↓ "}
              {trendValue}
            </span>
            <span className="ml-1 text-muted-foreground">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
