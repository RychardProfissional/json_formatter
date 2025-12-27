import React from "react";

interface ToolHeaderProps {
  title: string;
  subtitle?: string;
}

export function ToolHeader({ title, subtitle }: ToolHeaderProps) {
  return (
    <div className="mb-6 text-center md:text-left">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}
