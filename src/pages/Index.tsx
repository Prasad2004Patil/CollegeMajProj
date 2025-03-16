
import { Shield, AlertTriangle, Database, Activity, Lock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { ThreatMap } from "@/components/dashboard/ThreatMap";
import { AnomalyChart } from "@/components/dashboard/AnomalyChart";
import { SecurityAlerts } from "@/components/dashboard/SecurityAlerts";

const Index = () => {
  return (
    <Layout>
      <PageContainer
        title="Security Dashboard"
        description="AI-powered monitoring for cloud e-commerce data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatusCard
            title="Threat Score"
            value="73"
            icon={<Shield className="h-5 w-5" />}
            description="Current security risk level"
            trend="up"
            trendValue="12%"
            className="bg-security-navy border-l-4 border-security-blue"
          />
          <StatusCard
            title="Active Anomalies"
            value="7"
            icon={<AlertTriangle className="h-5 w-5" />}
            description="Detected in last 24 hours"
            trend="down"
            trendValue="3%"
            className="bg-security-navy border-l-4 border-security-alert"
            pulseEffect={true}
          />
          <StatusCard
            title="Protected Data"
            value="1.2 TB"
            icon={<Database className="h-5 w-5" />}
            description="Secure cloud storage"
            trend="up"
            trendValue="8%"
            className="bg-security-navy border-l-4 border-security-purple"
          />
          <StatusCard
            title="Transaction Volume"
            value="8,421"
            icon={<Activity className="h-5 w-5" />}
            description="Today's processed transactions"
            trend="neutral"
            trendValue="2%"
            className="bg-security-navy border-l-4 border-security-teal"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AnomalyChart />
          </div>
          <div>
            <SecurityAlerts />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ThreatMap />
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Index;
