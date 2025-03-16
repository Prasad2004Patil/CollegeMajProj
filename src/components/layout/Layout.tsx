
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-security-navy text-white">
      <Sidebar />
      <div className="md:ml-64">
        {children}
      </div>
    </div>
  );
}
