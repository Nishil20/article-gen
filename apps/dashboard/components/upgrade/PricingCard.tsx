"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PricingPlan } from "@/lib/mockData/pricing";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  onSelect: () => void;
  className?: string;
}

export function PricingCard({ plan, isAnnual, onSelect, className }: PricingCardProps) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <Card
      className={cn(
        "p-8 flex flex-col transition-all duration-200",
        plan.highlighted
          ? "border-2 border-[#171717] shadow-active scale-105"
          : "border border-[#e5e5e5] hover:shadow-active",
        className
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <Badge
          variant={plan.highlighted ? "default" : "outline"}
          className="mb-4 w-fit"
        >
          {plan.badge}
        </Badge>
      )}

      {/* Plan Name & Tagline */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#171717] mb-2 font-satoshi">
          {plan.name}
        </h3>
        <p className="text-sm text-[#737373]">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-[#171717] font-satoshi">
            ${price}
          </span>
          <span className="text-[#737373] text-base">/month</span>
        </div>
        {isAnnual && (
          <p className="text-xs text-[#10b981] mt-1 font-medium">
            Billed annually (${plan.annualPrice * 12}/year)
          </p>
        )}
      </div>

      {/* Words Per Month */}
      <div className="mb-6 p-4 bg-[#fafafa] rounded-lg">
        <p className="text-sm text-[#737373] mb-1">Words per month</p>
        <p className="text-2xl font-bold text-[#171717] font-satoshi">
          {plan.wordsPerMonth}
        </p>
      </div>

      {/* CTA */}
      <Button
        variant={plan.ctaVariant}
        onClick={onSelect}
        className={cn(
          "w-full mb-6",
          plan.highlighted && "bg-[#171717] text-white hover:bg-[#404040]"
        )}
      >
        {plan.cta}
      </Button>

      {/* Features */}
      <div className="mb-6 flex-1">
        <p className="text-sm font-semibold text-[#171717] mb-3">
          Everything included:
        </p>
        <ul className="space-y-2.5">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <svg
                className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5"
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
              <span className="text-sm text-[#525252]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Limits */}
      <div className="pt-6 border-t border-[#e5e5e5]">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-[#737373] mb-1">Articles</p>
            <p className="text-sm font-semibold text-[#171717]">
              {plan.limits.articles}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#737373] mb-1">Tools</p>
            <p className="text-sm font-semibold text-[#171717]">
              {plan.limits.tools}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#737373] mb-1">Users</p>
            <p className="text-sm font-semibold text-[#171717]">
              {plan.limits.users}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
