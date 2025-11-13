"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface CustomizationPanelProps {
  tone: string;
  setTone: (value: string) => void;
  toneOptions: Option[];

  length: string;
  setLength: (value: string) => void;
  lengthOptions: Option[];

  targetAudience: string;
  setTargetAudience: (value: string) => void;
  targetAudienceOptions: Option[];

  additionalOptions?: React.ReactNode;
}

export function CustomizationPanel({
  tone,
  setTone,
  toneOptions,
  length,
  setLength,
  lengthOptions,
  targetAudience,
  setTargetAudience,
  targetAudienceOptions,
  additionalOptions,
}: CustomizationPanelProps) {
  return (
    <div className="space-y-6">
      {/* Tone Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Tone</Label>
        <div className="grid grid-cols-2 gap-2">
          {toneOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTone(option.value)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium rounded-lg border-2 transition-all",
                tone === option.value
                  ? "bg-[#171717] text-white border-[#171717] shadow-sm"
                  : "bg-white text-[#404040] border-[#e5e5e5] hover:border-[#171717] hover:bg-[#fafafa]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Length Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Length</Label>
        <div className="grid grid-cols-1 gap-2">
          {lengthOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setLength(option.value)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium rounded-lg border-2 transition-all text-left",
                length === option.value
                  ? "bg-[#171717] text-white border-[#171717] shadow-sm"
                  : "bg-white text-[#404040] border-[#e5e5e5] hover:border-[#171717] hover:bg-[#fafafa]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Target Audience Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Target Audience</Label>
        <div className="grid grid-cols-2 gap-2">
          {targetAudienceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTargetAudience(option.value)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium rounded-lg border-2 transition-all",
                targetAudience === option.value
                  ? "bg-[#171717] text-white border-[#171717] shadow-sm"
                  : "bg-white text-[#404040] border-[#e5e5e5] hover:border-[#171717] hover:bg-[#fafafa]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Options (optional slot) */}
      {additionalOptions && <div>{additionalOptions}</div>}
    </div>
  );
}
