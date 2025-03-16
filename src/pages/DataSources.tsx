
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, CheckCircle, AlertCircle, Database, ShoppingCart, Lock, Network, Server, Activity, Users } from "lucide-react";

// Mock data sources
const dataSources = [
  {
    id: "ds-1",
    name: "E-commerce Transactions",
    type: "Transaction Data",
    status: "connected",
    lastSync: "5 minutes ago",
    records: "1.2M",
    size: "4.8 GB",
    syncRate: "Real-time",
    health: 98,
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    id: "ds-2",
    name: "Cloud Security Logs",
    type: "Security Logs",
    status: "connected",
    lastSync: "2 minutes ago",
    records: "8.6M",
    size: "12.3 GB",
    syncRate: "Real-time",
    health: 100,
    icon: <Lock className="h-5 w-5" />,
  },
  {
    id: "ds-3",
    name: "Network Monitoring",
    type: "Network Data",
    status: "connected",
    lastSync: "3 minutes ago",
    records: "5.1M",
    size: "7.2 GB",
    syncRate: "Real-time",
    health: 93,
    icon: <Network className="h-5 w-5" />,
  },
  {
    id: "ds-4",
    name: "API Gateway",
    type: "API Data",
    status: "connected",
    lastSync: "7 minutes ago",
    records: "3.4M",
    size: "1.8 GB",
    syncRate: "5 min interval",
    health: 97,
    icon: <Server className="h-5 w-5" />,
  },
  {
    id: "ds-5",
    name: "Customer Profiles",
    type: "User Data",
    status: "connected",
    lastSync: "15 minutes ago",
    records: "650K",
    size: "2.1 GB",
    syncRate: "15 min interval",
    health: 100,
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "ds-6",
    name: "Payment Processor",
    type: "Transaction Data",
    status: "warning",
    lastSync: "32 minutes ago",
    records: "950K",
    size: "3.5 GB",
    syncRate: "Real-time",
    health: 68,
    icon: <Activity className="h-5 w-5" />,
  },
];

const DataSources = () => {
  return (
    <Layout>
      <PageContainer
        title="Data Sources"
        description="Connected data sources for security monitoring"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dataSources.map((source) => (
            <Card key={source.id} className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-security-blue/20 flex items-center justify-center text-security-blue">
                    {source.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{source.name}</CardTitle>
                    <p className="text-sm text-gray-400">{source.type}</p>
                  </div>
                </div>
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
              </CardHeader>
              <CardContent className="pb-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Last Sync</p>
                    <p className="text-sm font-medium">{source.lastSync}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sync Rate</p>
                    <p className="text-sm font-medium">{source.syncRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Records</p>
                    <p className="text-sm font-medium">{source.records}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Size</p>
                    <p className="text-sm font-medium">{source.size}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-gray-400">Health</p>
                    <p className="text-sm font-medium">{source.health}%</p>
                  </div>
                  <Progress 
                    value={source.health} 
                    className="h-2"
                    color={
                      source.health > 90 
                        ? "bg-green-500" 
                        : source.health > 70 
                          ? "bg-security-amber" 
                          : "bg-security-alert"
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-security-blue border-security-blue/20 hover:bg-security-blue/10 w-full"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-0 border-dashed border-2 border-security-blue/30 shadow-none bg-transparent hover:bg-security-blue/5 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="h-12 w-12 rounded-full bg-security-blue/20 flex items-center justify-center text-security-blue mb-4">
                <PlusCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-security-blue mb-1">Add Data Source</h3>
              <p className="text-sm text-gray-400 text-center max-w-[250px]">
                Connect a new data source to enhance anomaly detection
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default DataSources;
