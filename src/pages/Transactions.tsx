
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const Transactions = () => {
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const { data: anomalies } = useQuery({
    queryKey: ['anomaliesForTransactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('anomalies')
        .select('transaction_id, risk_score');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const riskScoresByTxId = useMemo(() => {
    if (!anomalies) return new Map();
    return anomalies.reduce((acc, anomaly) => {
      if (anomaly.transaction_id && anomaly.risk_score) {
        acc.set(anomaly.transaction_id, anomaly.risk_score);
      }
      return acc;
    }, new Map<string, number>());
  }, [anomalies]);

  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-security-teal/20 text-security-teal";
    if (score < 70) return "bg-security-amber/20 text-security-amber";
    return "bg-security-alert/20 text-security-alert";
  };

  const isLoading = isLoadingTransactions;

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
                    <TableHead className="text-security-blue">Location</TableHead>
                    <TableHead className="text-security-blue">Status</TableHead>
                    <TableHead className="text-security-blue">Risk Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={7}>
                          <Skeleton className="h-8 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    transactions?.map((tx) => {
                      const riskScore = riskScoresByTxId.get(tx.id) || 0;
                      return (
                        <TableRow key={tx.id} className="data-grid-cell">
                          <TableCell className="font-mono">{tx.id.substring(0, 8)}...</TableCell>
                          <TableCell>{format(new Date(tx.created_at), "yyyy-MM-dd HH:mm:ss")}</TableCell>
                          <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: tx.currency }).format(tx.amount)}</TableCell>
                          <TableCell>{tx.customer_id}</TableCell>
                          <TableCell>{tx.location ? `${tx.location.city || ''}, ${tx.location.country || ''}` : 'N/A'}</TableCell>
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
                                  className={`h-full ${getRiskColor(riskScore)}`} 
                                  style={{ width: `${riskScore}%` }}
                                />
                              </div>
                              <span>{riskScore}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
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
