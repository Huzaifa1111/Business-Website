import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  variant?: "default" | "elevated" | "bordered";
}

const variantClasses = {
  default: "bg-white shadow-card",
  elevated: "bg-white shadow-hover",
  bordered: "bg-white border border-neutral-200 shadow-sm",
};

export function Card({
  children,
  hover = false,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${variantClasses[variant]} ${hover ? "card-hover" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
