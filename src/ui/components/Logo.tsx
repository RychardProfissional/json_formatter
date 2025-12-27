import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 font-bold text-xl tracking-tighter ${className}`}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 ring-1 ring-white/10">
        <span className="relative z-10">R</span>
        <div className="absolute inset-0 rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-500 opacity-50 blur-sm" />
      </div>
      <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
        Respawn
        <span className="text-violet-400">Tech</span>
      </span>
    </div>
  );
}
