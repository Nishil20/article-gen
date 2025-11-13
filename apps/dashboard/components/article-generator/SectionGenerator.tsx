"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCw, Edit3, Maximize2 } from "lucide-react";
import { OutlineItem } from "./OutlineEditor";

interface SectionContent {
  id: string;
  content: string;
  isGenerating: boolean;
}

interface SectionGeneratorProps {
  outline: OutlineItem[];
  sections: SectionContent[];
  onSectionsChange: (sections: SectionContent[]) => void;
  onGenerateAll: () => void;
}

export function SectionGenerator({
  outline,
  sections,
  onSectionsChange,
  onGenerateAll,
}: SectionGeneratorProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const handleGenerateSection = (id: string) => {
    onSectionsChange(
      sections.map((section) =>
        section.id === id ? { ...section, isGenerating: true } : section
      )
    );

    // Mock generation
    setTimeout(() => {
      onSectionsChange(
        sections.map((section) =>
          section.id === id
            ? {
                ...section,
                content: generateMockContent(
                  outline.find((item) => item.id === id)?.heading || ""
                ),
                isGenerating: false,
              }
            : section
        )
      );
    }, 2000);
  };

  const handleRewrite = (id: string) => {
    handleGenerateSection(id);
  };

  const handleRegenerate = (id: string) => {
    handleGenerateSection(id);
  };

  const handleExpand = (id: string) => {
    onSectionsChange(
      sections.map((section) =>
        section.id === id ? { ...section, isGenerating: true } : section
      )
    );

    setTimeout(() => {
      onSectionsChange(
        sections.map((section) =>
          section.id === id
            ? {
                ...section,
                content: section.content + "\n\n" + generateMockContent("expansion"),
                isGenerating: false,
              }
            : section
        )
      );
    }, 1500);
  };

  const allGenerated = sections.every((s) => s.content.length > 0);
  const isAnyGenerating = sections.some((s) => s.isGenerating);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#171717] font-satoshi tracking-[-0.02em]">
            Generate Sections
          </h3>
          <p className="text-sm text-[#737373] mt-1">
            Generate content for each section individually or all at once
          </p>
        </div>

        <Button
          onClick={onGenerateAll}
          disabled={isAnyGenerating || allGenerated}
          className="gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {allGenerated ? "All Sections Generated" : "Generate All Sections"}
        </Button>
      </div>

      <div className="space-y-4">
        {outline.map((item, index) => {
          const section = sections.find((s) => s.id === item.id);
          const isExpanded = expandedSections.has(item.id);
          const hasContent = section && section.content.length > 0;
          const isGenerating = section?.isGenerating || false;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden transition-all hover:shadow-sm"
            >
              <div
                className="p-5 cursor-pointer hover:bg-[#fafafa] transition-colors"
                onClick={() => hasContent && toggleSection(item.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#737373] bg-[#f5f5f5] px-2 py-1 rounded">
                        Section {index + 1}
                      </span>
                      {hasContent && (
                        <span className="text-xs font-medium text-[#10b981] bg-[#d1fae5] px-2 py-1 rounded">
                          ✓ Generated
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#171717] mt-2 font-satoshi">
                      {item.heading}
                    </h4>
                  </div>

                  {!hasContent && !isGenerating && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateSection(item.id);
                      }}
                      size="sm"
                      className="gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Section
                    </Button>
                  )}
                </div>
              </div>

              {isGenerating && (
                <div className="px-5 pb-5">
                  <div className="bg-[#fafafa] rounded-lg p-4 flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-[#171717] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-[#737373]">
                      Generating content...
                    </span>
                  </div>
                </div>
              )}

              {hasContent && isExpanded && !isGenerating && (
                <div className="px-5 pb-5 space-y-4">
                  <div className="bg-[#fafafa] rounded-lg p-4 border border-[#e5e5e5]">
                    <p className="text-sm text-[#404040] leading-[1.6] whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRewrite(item.id)}
                      className="gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Rewrite
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRegenerate(item.id)}
                      className="gap-2"
                    >
                      <RotateCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExpand(item.id)}
                      className="gap-2"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Expand
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mock content generator
function generateMockContent(heading: string): string {
  const templates = [
    `This section covers ${heading.toLowerCase()}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    `When considering ${heading.toLowerCase()}, it's important to understand the key concepts. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.`,
    `Let's explore ${heading.toLowerCase()} in detail. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}
