"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BillingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
  className?: string;
}

export function BillingToggle({ isAnnual, onToggle, className }: BillingToggleProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !isAnnual ? "text-[#171717]" : "text-[#737373]"
        )}
      >
        Monthly
      </span>

      <button
        onClick={() => onToggle(!isAnnual)}
        className={cn(
          "relative inline-flex h-8 w-14 items-center rounded-full transition-colors",
          isAnnual ? "bg-[#171717]" : "bg-[#e5e5e5]"
        )}
        role="switch"
        aria-checked={isAnnual}
      >
        <span
          className={cn(
            "inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm",
            isAnnual ? "translate-x-7" : "translate-x-1"
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            isAnnual ? "text-[#171717]" : "text-[#737373]"
          )}
        >
          Annual
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#10b981] text-white">
          Save 20%
        </span>
      </div>
    </div>
  );
}
