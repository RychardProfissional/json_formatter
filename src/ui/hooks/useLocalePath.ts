"use client";

import { usePathname } from "next/navigation";

export function useLocalePath() {
  const pathname = usePathname() ?? "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");

  return (path: string) => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (!isEn) return normalized;
    if (normalized === "/") return "/en";
    return `/en${normalized}`;
  };
}
