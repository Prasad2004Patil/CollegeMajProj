
import { ReactNode } from "react";

type PageContainerProps = {
  title: string;
  description?: string;
  headerActions?: ReactNode;
  children: ReactNode;
};

export function PageContainer({ title, description, headerActions, children }: PageContainerProps) {
  return (
    <div className="p-6 md:p-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
          {description && (
            <p className="mt-2 text-gray-400">{description}</p>
          )}
        </div>
        {headerActions && <div>{headerActions}</div>}
      </header>
      <main>{children}</main>
    </div>
  );
}
