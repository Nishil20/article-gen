import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function ProgressStepper({
  steps,
  currentStep,
  onStepClick,
  className,
}: ProgressStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;
          const isClickable = onStepClick && (isCompleted || isCurrent);

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
                    isCompleted &&
                      "bg-[#10b981] text-white cursor-pointer hover:bg-[#059669]",
                    isCurrent && "bg-[#171717] text-white ring-4 ring-[#e5e5e5]",
                    isUpcoming && "bg-[#f5f5f5] text-[#a3a3a3]",
                    !isClickable && "cursor-not-allowed"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
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
                  ) : (
                    index + 1
                  )}
                </button>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      isCurrent && "text-[#171717]",
                      (isCompleted || isUpcoming) && "text-[#737373]"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[10px] text-[#a3a3a3] mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-4 bg-[#e5e5e5] relative">
                  <div
                    className={cn(
                      "absolute left-0 top-0 h-full bg-[#10b981] transition-all duration-300",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Vertical Compact */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold",
                    isCompleted && "bg-[#10b981] text-white",
                    isCurrent && "bg-[#171717] text-white ring-2 ring-[#e5e5e5]",
                    !isCompleted && !isCurrent && "bg-[#f5f5f5] text-[#a3a3a3]"
                  )}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-6 h-[2px]",
                      isCompleted ? "bg-[#10b981]" : "bg-[#e5e5e5]"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-sm font-medium text-[#171717] mt-2">
          Step {currentStep + 1}: {steps[currentStep].label}
        </p>
      </div>
    </div>
  );
}
