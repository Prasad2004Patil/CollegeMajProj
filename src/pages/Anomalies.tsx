
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Activity, User, Database, Server } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for anomaly timeline
const anomalyTimelineData = [
  { timestamp: '01:00', anomalyCount: 3, baseline: 1 },
  { timestamp: '02:00', anomalyCount: 2, baseline: 1 },
  { timestamp: '03:00', anomalyCount: 5, baseline: 1 },
  { timestamp: '04:00', anomalyCount: 1, baseline: 1 },
  { timestamp: '05:00', anomalyCount: 0, baseline: 1 },
  { timestamp: '06:00', anomalyCount: 1, baseline: 1 },
  { timestamp: '07:00', anomalyCount: 3, baseline: 1 },
  { timestamp: '08:00', anomalyCount: 7, baseline: 1 },
  { timestamp: '09:00', anomalyCount: 12, baseline: 1 },
  { timestamp: '10:00', anomalyCount: 8, baseline: 1 },
  { timestamp: '11:00', anomalyCount: 4, baseline: 1 },
  { timestamp: '12:00', anomalyCount: 2, baseline: 1 },
];

// Mock data for anomaly distribution
const anomalyDistributionData = [
  { category: 'Transaction Fraud', count: 23 },
  { category: 'Authentication', count: 17 },
  { category: 'Data Access', count: 12 },
  { category: 'Network', count: 8 },
  { category: 'API Abuse', count: 5 },
];

// Mock data for recent anomalies
const recentAnomalies = [
  {
    id: 'anom-1',
    type: 'Transaction',
    severity: 'critical',
    description: 'Unusual purchase pattern detected from IP 185.176.43.89',
    time: '10 minutes ago',
    source: 'Transaction Processing',
    confidence: 98,
  },
  {
    id: 'anom-2',
    type: 'Authentication',
    severity: 'high',
    description: 'Multiple failed login attempts for user admin@example.com',
    time: '25 minutes ago',
    source: 'Auth Service',
    confidence: 87,
  },
  {
    id: 'anom-3',
    type: 'Data Access',
    severity: 'high',
    description: 'Unusual volume of data accessed by API key CC792F',
    time: '1 hour ago',
    source: 'Database Service',
    confidence: 92,
  },
  {
    id: 'anom-4',
    type: 'API',
    severity: 'medium',
    description: 'Abnormal API request pattern from client application',
    time: '2 hours ago',
    source: 'API Gateway',
    confidence: 76,
  },
  {
    id: 'anom-5',
    type: 'Network',
    severity: 'low',
    description: 'Unusual connection attempts from geolocation',
    time: '3 hours ago',
    source: 'Network Monitoring',
    confidence: 68,
  },
];

const Anomalies = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <PageContainer
        title="Anomaly Detection"
        description="LSTM and GNN powered analysis of security logs and transaction data"
      >
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-[400px] bg-security-navy">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-security-blue">Anomaly Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={anomalyDistributionData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="category" 
                          tick={{ fill: '#9ca3af' }} 
                          axisLine={{ stroke: '#374151' }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#374151' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            borderColor: '#3b82f6', 
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-security-blue">Anomaly Timeline (24h)</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={anomalyTimelineData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="timestamp" 
                          tick={{ fill: '#9ca3af' }} 
                          axisLine={{ stroke: '#374151' }}
                        />
                        <YAxis tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#374151' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            borderColor: '#3b82f6', 
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="anomalyCount" 
                          stroke="#dc2626" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                          name="Anomalies"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="baseline" 
                          stroke="#0d9488" 
                          strokeDasharray="5 5" 
                          strokeWidth={2}
                          name="Baseline"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-security-blue">Recent Anomalies</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-4">
                  {recentAnomalies.map((anomaly) => (
                    <li 
                      key={anomaly.id}
                      className="p-4 rounded-md bg-security-navy border-l-4 border-security-blue"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="outline"
                              className={
                                anomaly.severity === "critical" 
                                  ? "border-security-alert text-security-alert" 
                                  : anomaly.severity === "high"
                                    ? "border-security-amber text-security-amber"
                                    : anomaly.severity === "medium"
                                      ? "border-security-purple text-security-purple"
                                      : "border-security-teal text-security-teal"
                              }
                            >
                              {anomaly.severity}
                            </Badge>
                            <Badge variant="outline" className="border-security-blue text-security-blue">
                              {anomaly.type}
                            </Badge>
                            <span className="text-sm text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {anomaly.time}
                            </span>
                          </div>
                          <p className="text-white font-medium">{anomaly.description}</p>
                          <div className="mt-2 text-sm text-gray-400">
                            <span>Source: {anomaly.source}</span>
                            <span className="mx-2">•</span>
                            <span>Confidence: {anomaly.confidence}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-security-alert/10">
                          {anomaly.type === 'Transaction' && <Activity className="h-5 w-5 text-security-alert" />}
                          {anomaly.type === 'Authentication' && <User className="h-5 w-5 text-security-amber" />}
                          {anomaly.type === 'Data Access' && <Database className="h-5 w-5 text-security-purple" />}
                          {anomaly.type === 'API' && <Server className="h-5 w-5 text-security-blue" />}
                          {anomaly.type === 'Network' && <AlertTriangle className="h-5 w-5 text-security-teal" />}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-0 shadow-lg bg-security-navy p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">AI Analysis Technologies</h3>
                  <p className="text-gray-400">Secure, efficient, and accurate anomaly detection powered by advanced AI</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-md bg-black/20 backdrop-blur-sm border border-security-blue/20">
                    <h4 className="text-security-blue font-semibold mb-2 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-security-blue/20 flex items-center justify-center">
                        <span className="text-xs text-security-blue font-bold">1</span>
                      </div>
                      Graph Neural Networks (GNNs)
                    </h4>
                    <p className="text-sm text-gray-300">
                      Detect complex patterns in transaction data by modeling relationships between entities. 
                      Our GNN models learn the normal structure of interactions to identify anomalous connections 
                      and transaction patterns that may indicate fraud.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md bg-black/20 backdrop-blur-sm border border-security-blue/20">
                    <h4 className="text-security-blue font-semibold mb-2 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-security-blue/20 flex items-center justify-center">
                        <span className="text-xs text-security-blue font-bold">2</span>
                      </div>
                      LSTM Anomaly Detection
                    </h4>
                    <p className="text-sm text-gray-300">
                      Analyze time-series security logs to identify temporal anomalies. 
                      Long Short-Term Memory networks capture long-term dependencies in 
                      sequence data, enabling detection of subtle deviations from normal patterns.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md bg-black/20 backdrop-blur-sm border border-security-blue/20">
                    <h4 className="text-security-blue font-semibold mb-2 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-security-blue/20 flex items-center justify-center">
                        <span className="text-xs text-security-blue font-bold">3</span>
                      </div>
                      Hybrid Encryption
                    </h4>
                    <p className="text-sm text-gray-300">
                      Secure data with RSA for key exchange and AES/Blowfish for fast symmetric 
                      encryption. This hybrid approach ensures strong protection for sensitive 
                      e-commerce data while maintaining computational efficiency.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md bg-black/20 backdrop-blur-sm border border-security-blue/20">
                    <h4 className="text-security-blue font-semibold mb-2 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-security-blue/20 flex items-center justify-center">
                        <span className="text-xs text-security-blue font-bold">4</span>
                      </div>
                      GPU-Accelerated Inference
                    </h4>
                    <p className="text-sm text-gray-300">
                      Achieve real-time anomaly detection with GPU-optimized models 
                      deployed on cloud platforms. This architecture ensures minimal 
                      latency and high scalability for large-scale security monitoring.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </Layout>
  );
};

export default Anomalies;
