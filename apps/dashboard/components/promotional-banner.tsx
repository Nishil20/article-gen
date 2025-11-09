"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockBanner } from "@/lib/mockData";

export function PromotionalBanner() {
  const handleActivate = () => {
    alert("Coming Soon! This feature is currently in development.");
  };

  return (
    <Card className="overflow-hidden shadow-default">
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left side - Content */}
        <div className="space-y-6">
          <Badge variant="default" className="inline-flex gap-2">
            {mockBanner.badge}
          </Badge>

          <div className="space-y-4">
            <h2 className="text-[36px] md:text-[48px] font-bold text-[#171717] leading-[1.1] tracking-[-0.02em] font-satoshi">
              {mockBanner.title}
            </h2>
            <p className="text-lg text-[#737373] leading-[1.6]">
              {mockBanner.description}
            </p>
          </div>

          <ul className="space-y-3">
            {mockBanner.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-[#404040] font-medium">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleActivate}
            size="lg"
            className="mt-6"
          >
            {mockBanner.ctaText}
          </Button>
        </div>

        {/* Right side - Visual placeholder */}
        <div className="hidden md:flex items-center justify-center bg-[#fafafa] rounded-xl p-8">
          <div className="text-center space-y-4">
            <div className="text-6xl">📊</div>
            <p className="text-sm text-[#737373] font-medium">
              Analytics Preview
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border border-[#e5e5e5]">
                <div className="text-2xl font-bold text-[#171717] font-satoshi">
                  95%
                </div>
                <div className="text-xs text-[#737373] mt-1">SEO Score</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#e5e5e5]">
                <div className="text-2xl font-bold text-[#171717] font-satoshi">
                  24
                </div>
                <div className="text-xs text-[#737373] mt-1">Keywords</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#e5e5e5]">
                <div className="text-2xl font-bold text-[#171717] font-satoshi">
                  8.2
                </div>
                <div className="text-xs text-[#737373] mt-1">Readability</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#e5e5e5]">
                <div className="text-2xl font-bold text-[#171717] font-satoshi">
                  A+
                </div>
                <div className="text-xs text-[#737373] mt-1">Grade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
