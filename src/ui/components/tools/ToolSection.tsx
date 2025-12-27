import React from "react";

interface ToolSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ToolSection({ children, className, title }: ToolSectionProps) {
  return (
    <section
      className={`mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className ??
        ""}`}
    >
      {title && (
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
