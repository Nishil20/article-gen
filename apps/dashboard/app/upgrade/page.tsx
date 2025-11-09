"use client";

import * as React from "react";
import { BillingToggle } from "@/components/upgrade/BillingToggle";
import { PricingCard } from "@/components/upgrade/PricingCard";
import { ComparisonTable } from "@/components/upgrade/ComparisonTable";
import { TestimonialCard } from "@/components/upgrade/TestimonialCard";
import { FAQAccordion } from "@/components/upgrade/FAQAccordion";
import {
  pricingPlans,
  comparisonFeatures,
  testimonials,
  faqs,
} from "@/lib/mockData/pricing";

export default function UpgradePage() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  const handlePlanSelect = (planId: string) => {
    alert(`Selected plan: ${planId} (${isAnnual ? "Annual" : "Monthly"})\n\nThis would normally redirect to checkout.`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#171717] mb-4 font-satoshi tracking-[-0.02em]">
              Choose Your Plan
            </h1>
            <p className="text-lg text-[#737373] max-w-2xl mx-auto mb-8">
              Unlock the full potential of AI-powered content creation. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <BillingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
          </div>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isAnnual={isAnnual}
              onSelect={() => handlePlanSelect(plan.id)}
            />
          ))}
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-4 font-satoshi">
              Compare All Features
            </h2>
            <p className="text-base text-[#737373] max-w-2xl mx-auto">
              See exactly what's included in each plan to find the perfect fit for your needs.
            </p>
          </div>

          <ComparisonTable categories={comparisonFeatures} />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-4 font-satoshi">
            Loved by Content Creators
          </h2>
          <p className="text-base text-[#737373] max-w-2xl mx-auto">
            See what our customers have to say about ContentGen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-4 font-satoshi">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#737373] max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#171717] mb-4 font-satoshi">
              Still have questions?
            </h2>
            <p className="text-base text-[#737373] mb-6">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:sales@contentgen.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#171717] text-white font-medium hover:bg-[#404040] transition-colors"
              >
                Contact Sales
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#e5e5e5] text-[#171717] font-medium hover:bg-[#fafafa] transition-colors"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
