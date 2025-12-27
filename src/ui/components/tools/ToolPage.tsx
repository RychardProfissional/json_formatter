import React from "react";

export function ToolPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`mx-auto max-w-5xl px-4 py-10 ${className ?? ""}`}>
      {children}
    </main>
  );
}
