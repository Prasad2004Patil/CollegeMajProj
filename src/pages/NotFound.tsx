
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Shield, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="bg-security-navy p-8 rounded-lg border border-security-blue/20 shadow-lg text-center max-w-md w-full">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Shield className="h-20 w-20 text-security-blue" />
              <AlertTriangle className="h-8 w-8 text-security-alert absolute bottom-0 right-0" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">404</h1>
          <p className="text-xl text-gray-400 mb-6">Security breach detected</p>
          <p className="text-gray-300 mb-8">
            The resource at <span className="font-mono text-security-alert">{location.pathname}</span> could not be located.
          </p>
          <Button 
            variant="default" 
            className="w-full bg-security-blue hover:bg-security-blue/80"
            onClick={() => window.location.href = '/'}
          >
            Return to Command Center
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
