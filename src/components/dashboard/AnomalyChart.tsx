
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for anomaly chart
const data = [
  { time: '00:00', normal: 40, anomalies: 2 },
  { time: '02:00', normal: 25, anomalies: 1 },
  { time: '04:00', normal: 15, anomalies: 0 },
  { time: '06:00', normal: 20, anomalies: 0 },
  { time: '08:00', normal: 45, anomalies: 1 },
  { time: '10:00', normal: 80, anomalies: 3 },
  { time: '12:00', normal: 85, anomalies: 2 },
  { time: '14:00', normal: 75, anomalies: 1 },
  { time: '16:00', normal: 90, anomalies: 4 },
  { time: '18:00', normal: 70, anomalies: 7 },
  { time: '20:00', normal: 50, anomalies: 3 },
  { time: '22:00', normal: 35, anomalies: 1 },
];

export function AnomalyChart() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-security-blue">24h Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#374151' }} />
              <YAxis tick={{ fill: '#9ca3af' }} axisLine={{ stroke: '#374151' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderColor: '#3b82f6', 
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="normal" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNormal)" 
                name="Normal Activity" 
              />
              <Area 
                type="monotone" 
                dataKey="anomalies" 
                stroke="#dc2626" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorAnomalies)" 
                name="Anomalies" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
