
import { ReactNode } from "react";

type PageContainerProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageContainer({ title, description, children }: PageContainerProps) {
  return (
    <div className="p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
        {description && (
          <p className="mt-2 text-gray-400">{description}</p>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
