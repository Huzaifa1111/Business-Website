import type { ReactNode } from "react";

type BadgeVariant = "primary" | "accent" | "neutral" | "success";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-100 text-primary-700 ring-1 ring-primary-200",
  accent: "bg-accent-100 text-accent-700 ring-1 ring-accent-200",
  neutral: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
  success: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
