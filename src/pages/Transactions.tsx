
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ShieldCheck } from "lucide-react";

// Mock transaction data
const transactions = [
  { 
    id: "tx-1", 
    time: "2023-07-01 14:32:41", 
    amount: "$1,245.00", 
    customer: "Sarah Johnson", 
    ip: "104.28.42.121", 
    location: "New York, USA", 
    status: "verified", 
    riskScore: 12 
  },
  { 
    id: "tx-2", 
    time: "2023-07-01 14:18:22", 
    amount: "$5,600.00", 
    customer: "Michael Chen", 
    ip: "185.176.43.89", 
    location: "Berlin, Germany", 
    status: "verified", 
    riskScore: 28 
  },
  { 
    id: "tx-3", 
    time: "2023-07-01 13:57:08", 
    amount: "$899.99", 
    customer: "Elena Rodriguez", 
    ip: "92.118.160.5", 
    location: "Madrid, Spain", 
    status: "suspicious", 
    riskScore: 78 
  },
  { 
    id: "tx-4", 
    time: "2023-07-01 13:41:33", 
    amount: "$127.50", 
    customer: "James Wilson", 
    ip: "101.33.56.12", 
    location: "Sydney, Australia", 
    status: "verified", 
    riskScore: 15 
  },
  { 
    id: "tx-5", 
    time: "2023-07-01 13:12:45", 
    amount: "$2,450.00", 
    customer: "Aisha Patel", 
    ip: "45.89.174.62", 
    location: "Mumbai, India", 
    status: "suspicious", 
    riskScore: 85 
  },
  { 
    id: "tx-6", 
    time: "2023-07-01 12:48:19", 
    amount: "$780.25", 
    customer: "David Kim", 
    ip: "118.69.175.21", 
    location: "Seoul, South Korea", 
    status: "verified", 
    riskScore: 31 
  },
  { 
    id: "tx-7", 
    time: "2023-07-01 12:36:54", 
    amount: "$3,299.00", 
    customer: "Olivia Brown", 
    ip: "194.127.108.54", 
    location: "London, UK", 
    status: "fraud", 
    riskScore: 96 
  },
  { 
    id: "tx-8", 
    time: "2023-07-01 12:14:38", 
    amount: "$549.99", 
    customer: "Carlos Mendez", 
    ip: "89.187.175.10", 
    location: "Sao Paulo, Brazil", 
    status: "verified", 
    riskScore: 24 
  },
];

const Transactions = () => {
  // Function to get color based on risk score
  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-security-teal/20 text-security-teal";
    if (score < 70) return "bg-security-amber/20 text-security-amber";
    return "bg-security-alert/20 text-security-alert";
  };

  return (
    <Layout>
      <PageContainer
        title="Transaction Monitoring"
        description="AI-powered fraud detection and analysis"
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-security-blue">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-security-navy">
                  <TableRow>
                    <TableHead className="text-security-blue">Transaction ID</TableHead>
                    <TableHead className="text-security-blue">Time</TableHead>
                    <TableHead className="text-security-blue">Amount</TableHead>
                    <TableHead className="text-security-blue">Customer</TableHead>
                    <TableHead className="text-security-blue">IP Address</TableHead>
                    <TableHead className="text-security-blue">Location</TableHead>
                    <TableHead className="text-security-blue">Status</TableHead>
                    <TableHead className="text-security-blue">Risk Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} className="data-grid-cell">
                      <TableCell className="font-mono">{tx.id}</TableCell>
                      <TableCell>{tx.time}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>{tx.customer}</TableCell>
                      <TableCell className="font-mono text-xs">{tx.ip}</TableCell>
                      <TableCell>{tx.location}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            tx.status === "verified" 
                              ? "border-security-teal text-security-teal flex items-center gap-1" 
                              : tx.status === "suspicious"
                                ? "border-security-amber text-security-amber flex items-center gap-1"
                                : "border-security-alert text-security-alert flex items-center gap-1"
                          }
                        >
                          {tx.status === "verified" && <ShieldCheck className="h-3 w-3" />}
                          {(tx.status === "suspicious" || tx.status === "fraud") && <AlertTriangle className="h-3 w-3" />}
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-4 rounded-full bg-gray-700 overflow-hidden">
                            <div 
                              className={`h-full ${getRiskColor(tx.riskScore)}`} 
                              style={{ width: `${tx.riskScore}%` }}
                            />
                          </div>
                          <span>{tx.riskScore}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </Layout>
  );
};

export default Transactions;
