
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddDataSourceButton } from "@/components/data-sources/AddDataSourceButton";
import { toast } from "@/hooks/use-toast";
import { DataSourceCard, SupabaseDataSource } from "@/components/data-sources/DataSourceCard";
import { DataSourceCardSkeleton } from "@/components/data-sources/DataSourceCardSkeleton";

const DataSources = () => {
  const queryClient = useQueryClient();
  const { data: dataSources, isLoading } = useQuery<SupabaseDataSource[]>({
    queryKey: ['data_sources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("data_sources").delete().eq("id", id);
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data_sources"] });
      toast({
        title: "Success",
        description: "Data source deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting data source",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Layout>
      <PageContainer
        title="Data Sources"
        description="Connected data sources for security monitoring"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <DataSourceCardSkeleton key={i} />
            ))
          ) : (
            dataSources?.map((source) => (
              <DataSourceCard key={source.id} source={source} onDelete={deleteMutation.mutate} />
            ))
          )}
          
          <AddDataSourceButton />
        </div>
      </PageContainer>
    </Layout>
  );
};

export default DataSources;
