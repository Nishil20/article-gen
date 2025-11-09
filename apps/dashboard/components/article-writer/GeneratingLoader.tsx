"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GeneratingLoaderProps {
  steps?: string[];
  className?: string;
}

const defaultSteps = [
  "Researching keywords...",
  "Creating outline...",
  "Writing content...",
  "Optimizing for SEO...",
];

export function GeneratingLoader({
  steps = defaultSteps,
  className,
}: GeneratingLoaderProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000); // Change step every 2 seconds

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <Card
      className={cn(
        "p-12 flex flex-col items-center justify-center min-h-[400px]",
        className
      )}
    >
      {/* Animated Icon */}
      <div className="relative w-24 h-24 mb-8">
        {/* Outer rotating circle */}
        <div className="absolute inset-0 border-4 border-[#e5e5e5] rounded-full animate-spin">
          <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-[#171717] rounded-full" />
        </div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl animate-pulse">✨</div>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-[#171717] font-inter">
          Generating Your Article
        </h3>

        {/* Progress Steps */}
        <div className="space-y-2 min-h-[60px]">
          {steps.map((step, index) => (
            <p
              key={index}
              className={cn(
                "text-sm transition-all duration-300",
                index === currentStep
                  ? "text-[#171717] font-medium opacity-100 scale-105"
                  : "text-[#a3a3a3] opacity-40 scale-95",
                index !== currentStep && "hidden"
              )}
            >
              {step}
            </p>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentStep
                  ? "bg-[#171717] w-8"
                  : index < currentStep
                  ? "bg-[#10b981]"
                  : "bg-[#e5e5e5]"
              )}
            />
          ))}
        </div>

        <p className="text-xs text-[#737373] pt-4">
          This usually takes 5-10 seconds...
        </p>
      </div>

      {/* Animated Bars (decorative) */}
      <div className="flex items-end gap-1 mt-8 h-16">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 bg-[#171717] rounded-t-sm animate-pulse"
            style={{
              height: `${20 + Math.random() * 80}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    </Card>
  );
}
