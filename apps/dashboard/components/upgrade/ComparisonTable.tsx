"use client";

import * as React from "react";
import type { ComparisonCategory } from "@/lib/mockData/pricing";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  categories: ComparisonCategory[];
  className?: string;
}

export function ComparisonTable({ categories, className }: ComparisonTableProps) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <svg
          className="w-5 h-5 text-[#10b981] mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-[#e5e5e5] mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
    return (
      <span className="text-sm font-medium text-[#171717]">{value}</span>
    );
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[640px]">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-[#fafafa] rounded-t-xl border border-[#e5e5e5]">
          <div className="text-sm font-semibold text-[#171717]">Features</div>
          <div className="text-sm font-semibold text-[#171717] text-center">
            Pro
          </div>
          <div className="text-sm font-semibold text-[#171717] text-center">
            Max
          </div>
          <div className="text-sm font-semibold text-[#171717] text-center">
            Ultra
          </div>
        </div>

        {/* Table Body */}
        {categories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="border-x border-b border-[#e5e5e5] last:rounded-b-xl overflow-hidden"
          >
            {/* Category Header */}
            <div className="p-4 bg-[#f5f5f5] border-b border-[#e5e5e5]">
              <h3 className="text-sm font-bold text-[#171717]">
                {category.category}
              </h3>
            </div>

            {/* Features in Category */}
            {category.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className={cn(
                  "grid grid-cols-4 gap-4 p-4 items-center",
                  featureIndex < category.features.length - 1 &&
                    "border-b border-[#e5e5e5]",
                  featureIndex % 2 === 0 && "bg-white",
                  featureIndex % 2 === 1 && "bg-[#fafafa]"
                )}
              >
                <div className="text-sm text-[#525252]">{feature.name}</div>
                <div className="flex justify-center">
                  {renderCell(feature.pro)}
                </div>
                <div className="flex justify-center">
                  {renderCell(feature.max)}
                </div>
                <div className="flex justify-center">
                  {renderCell(feature.ultra)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
