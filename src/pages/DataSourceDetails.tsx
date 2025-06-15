
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowLeft } from "lucide-react";

const DataSourceDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: dataSource, isLoading, error } = useQuery({
    queryKey: ['data_source', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!id,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
    }

    if (error) {
        return <p className="text-destructive">Error: {error.message}</p>
    }

    if (!dataSource) {
      return <p>Data source not found.</p>;
    }
    
    if (dataSource.type === 'Custom Database') {
      return (
        <div className="space-y-4">
            <Alert className="bg-security-navy-deep border-security-blue/30">
              <Terminal className="h-4 w-4 text-security-blue" />
              <AlertTitle className="text-white">Connect to MongoDB</AlertTitle>
              <AlertDescription className="text-gray-400">
                To view data from your MongoDB, we need to set up a secure connection. This uses a Supabase Edge Function as a proxy.
                I can guide you through this in the next step.
              </AlertDescription>
            </Alert>
            <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Connection Details</h3>
                <Card className="bg-security-navy-deep border-security-blue/20">
                    <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                        <div><strong className="font-medium text-white">Name:</strong> {dataSource.name}</div>
                        <div><strong className="font-medium text-white">Type:</strong> {dataSource.type}</div>
                        <div><strong className="font-medium text-white">Status:</strong> {dataSource.status}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
      );
    }
    
    return <p className="text-gray-400">A detailed view for data sources of type '{dataSource.type}' is not yet available.</p>;
  }


  return (
    <Layout>
      <PageContainer
        title={dataSource?.name || "Data Source Details"}
        description={`Details for your connected data source`}
        headerActions={
            <Button asChild variant="outline">
                <Link to="/data-sources">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Data Sources
                </Link>
            </Button>
        }
      >
        <Card className="bg-security-navy border-security-blue/20">
            <CardHeader>
                <CardTitle className="text-white">Data Source Overview</CardTitle>
            </CardHeader>
            <CardContent>
                {renderContent()}
            </CardContent>
        </Card>
      </PageContainer>
    </Layout>
  );
};

export default DataSourceDetails;
