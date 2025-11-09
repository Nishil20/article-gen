"use client";

import * as React from "react";
import type { FAQ } from "@/lib/mockData/pricing";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className="border border-[#e5e5e5] rounded-xl overflow-hidden transition-all duration-200 hover:shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left transition-colors hover:bg-[#fafafa]"
            >
              <span className="text-base font-semibold text-[#171717]">
                {faq.question}
              </span>
              <svg
                className={cn(
                  "w-5 h-5 text-[#737373] flex-shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="px-6 pb-4 pt-0">
                <p className="text-sm text-[#525252] leading-[1.7]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
