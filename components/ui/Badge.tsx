import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "teal" | "emergency" | "success" | "neutral" | "medical";
  size?: "sm" | "md";
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "teal",
  size = "md",
  dot = false,
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    teal: "bg-teal-50 text-teal-800 border-teal-200",
    emergency: "bg-red-50 text-red-700 border-red-200",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    medical: "bg-medical-50 text-medical-800 border-medical-200",
  };

  const dotColors = {
    teal: "bg-teal-500",
    emergency: "bg-red-500",
    success: "bg-emerald-500",
    neutral: "bg-slate-400",
    medical: "bg-medical-500",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full inline-block flex-shrink-0",
            dotColors[variant],
            pulse && "animate-pulse"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
