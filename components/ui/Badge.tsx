import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "payee" | "envoyee" | "brouillon" | "en retard" | "default";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = "default", children, className, ...props }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    payee: "bg-emerald-50 text-emerald-700 border-emerald-200",
    envoyee: "bg-amber-50 text-amber-700 border-amber-200",
    brouillon: "bg-slate-50 text-slate-600 border-slate-200",
    "en retard": "bg-rose-50 text-rose-700 border-rose-200",
    default: "bg-xyrm-green-deep/5 text-xyrm-green-deep border-xyrm-green-deep/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
