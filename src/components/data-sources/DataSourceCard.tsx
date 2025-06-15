
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Database, ShoppingCart, Lock, Network, Server, Activity, Users, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNow } from "date-fns";

export interface SupabaseDataSource {
  id: string;
  created_at: string;
  name: string;
  type: string;
  status: "connected" | "warning" | "error";
  last_synced_at: string | null;
  file_metadata: { [key: string]: any } | null;
}

const getIconForType = (type: string) => {
    switch(type) {
        case "E-commerce Transactions":
        case "Transaction Data": 
            return <ShoppingCart className="h-5 w-5" />;
        case "Cloud Security Logs":
        case "Security Logs": 
            return <Lock className="h-5 w-5" />;
        case "Network Monitoring":
        case "Network Data":
            return <Network className="h-5 w-5" />;
        case "API Gateway":
        case "API Data":
            return <Server className="h-5 w-5" />;
        case "Customer Profiles":
        case "User Data":
            return <Users className="h-5 w-5" />;
        case "Payment Processor":
            return <Activity className="h-5 w-5" />;
        default: return <Database className="h-5 w-5" />;
    }
};

const getHealth = (status: string) => {
  if (status === 'connected') return 100;
  if (status === 'warning') return 68;
  return 20;
}

interface DataSourceCardProps {
  source: SupabaseDataSource;
  onDelete: (id: string) => void;
}

export const DataSourceCard = ({ source, onDelete }: DataSourceCardProps) => {
  const health = getHealth(source.status);
  const fileMeta = source.file_metadata as { size?: number } | null;
  const sizeDisplay = (source.type === 'File Upload' && fileMeta?.size)
    ? `${(fileMeta.size / 1024).toFixed(2)} KB`
    : 'N/A';

  return (
    <Card key={source.id} className="border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-security-blue/20 flex items-center justify-center text-security-blue">
            {getIconForType(source.type)}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">{source.name}</CardTitle>
            <p className="text-sm text-gray-400">{source.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={
              source.status === "connected"
                ? "border-green-500 text-green-500 flex items-center gap-1"
                : source.status === "warning"
                  ? "border-security-amber text-security-amber flex items-center gap-1"
                  : "border-security-alert text-security-alert flex items-center gap-1"
            }
          >
            {source.status === "connected" && <CheckCircle className="h-3 w-3" />}
            {source.status === "warning" && <AlertCircle className="h-3 w-3" />}
            {source.status === "error" && <AlertCircle className="h-3 w-3" />}
            {source.status}
          </Badge>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-security-alert hover:bg-security-alert/10 h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-security-navy border-security-blue/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This action cannot be undone. This will permanently delete this data source.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(source.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">Last Sync</p>
            <p className="text-sm font-medium">{source.last_synced_at ? formatDistanceToNow(new Date(source.last_synced_at), { addSuffix: true }) : 'Never'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Sync Rate</p>
            <p className="text-sm font-medium">Real-time</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Records</p>
            <p className="text-sm font-medium">N/A</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Size</p>
            <p className="text-sm font-medium">{sizeDisplay}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-400">Health</p>
            <p className="text-sm font-medium">{health}%</p>
          </div>
          <Progress 
            value={health} 
            className="h-2"
            color={
              health > 90 
                ? "bg-green-500" 
                : health > 70 
                  ? "bg-security-amber" 
                  : "bg-security-alert"
            }
          />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          asChild
          variant="outline" 
          size="sm" 
          className="text-security-blue border-security-blue/20 hover:bg-security-blue/10 w-full"
        >
          <Link to={`/data-sources/${source.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
