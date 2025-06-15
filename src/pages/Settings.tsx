
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { NotificationsSettings } from "@/components/settings/NotificationsSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { ModelSettings } from "@/components/settings/ModelSettings";

const Settings = () => {
  return (
    <Layout>
      <PageContainer
        title="Settings"
        description="Configure your security monitoring system"
      >
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="grid grid-cols-4 w-[600px] bg-security-navy">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="model">AI Model</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <NotificationsSettings />
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="model" className="mt-6">
            <ModelSettings />
          </TabsContent>
        </Tabs>
      </PageContainer>
    </Layout>
  );
};

export default Settings;
