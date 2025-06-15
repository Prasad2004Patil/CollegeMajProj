
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-security-navy text-white">
      <Sidebar />
      <div className="md:ml-64 relative">
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={signOut}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-security-dark-navy"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sign Out</span>
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
