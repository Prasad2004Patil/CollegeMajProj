
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="md:ml-64 relative">
        {children}
      </div>
    </div>
  );
}
