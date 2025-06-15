
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Shield,
  AlertTriangle,
  Activity,
  Database,
  Settings,
  Menu,
  X
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState(() => localStorage.getItem("settings:email") || "admin@shieldbrain.ai");
  const [username, setUsername] = useState(() => localStorage.getItem("settings:username") || "securityadmin");

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setEmail(localStorage.getItem("settings:email") || "admin@shieldbrain.ai");
      setUsername(localStorage.getItem("settings:username") || "securityadmin");
    };

    window.addEventListener("settings-updated", handleSettingsUpdate);

    return () => {
      window.removeEventListener("settings-updated", handleSettingsUpdate);
    };
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "SA";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return (nameParts[0][0] + (nameParts[1][0] || "")).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: "Anomalies",
      href: "/anomalies",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      title: "Data Sources",
      href: "/data-sources",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-security-navy border-security-blue"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-security-navy shadow-lg transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-security-blue/20">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-security-blue" />
              <span className="font-bold text-xl text-white">ShieldBrain</span>
            </Link>
          </div>
          
          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-security-blue text-white"
                    : "text-gray-300 hover:bg-security-blue/20 hover:text-white"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="p-4 border-t border-security-blue/20">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-security-blue/20 flex items-center justify-center text-security-blue">
                <span className="font-semibold">{getInitials(username)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white capitalize">{username}</p>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
