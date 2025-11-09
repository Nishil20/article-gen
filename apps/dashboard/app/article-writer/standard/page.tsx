"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressStepper } from "@/components/article-writer/ProgressStepper";
import { GeneratingLoader } from "@/components/article-writer/GeneratingLoader";
import { ArticleEditor } from "@/components/article-writer/ArticleEditor";
import {
  mockKeywords,
  mockArticle,
  mockSEOScores,
  mockMetaTags,
} from "@/lib/mockData/articleGenerator";
import { cn } from "@/lib/utils";

const steps = [
  { id: "keywords", label: "Keywords", description: "Topic & keywords" },
  { id: "draft", label: "Draft", description: "Generate content" },
  { id: "seo", label: "SEO", description: "Optimize" },
  { id: "meta", label: "Meta Tags", description: "SEO metadata" },
  { id: "export", label: "Export", description: "Preview & save" },
];

export default function StandardWorkflowPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [topic, setTopic] = React.useState("");
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);
  const [generatedArticle, setGeneratedArticle] = React.useState("");
  const [metaTitle, setMetaTitle] = React.useState("");
  const [metaDescription, setMetaDescription] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleNext = () => {
    if (currentStep === 1) {
      // Generate draft
      setIsGenerating(true);
      setTimeout(() => {
        setGeneratedArticle(mockArticle);
        setMetaTitle(mockMetaTags.title);
        setMetaDescription(mockMetaTags.description);
        setIsGenerating(false);
        setCurrentStep(2);
      }, 6000);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && !isGenerating) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleSave = () => {
    alert("Article saved to My Content!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/article-writer"
              className="text-[#737373] hover:text-[#171717] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-[#171717] font-satoshi tracking-[-0.02em]">
                Standard Workflow
              </h1>
              <Badge variant="default">🎯 Balanced</Badge>
            </div>
          </div>
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-12">
        {/* Step 1: Topic & Keywords */}
        {currentStep === 0 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6 font-satoshi">
              Topic & Keyword Research
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">
                  Article Topic <span className="text-[#ff6b35]">*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., AI content generation for marketing"
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#404040] mb-3">
                  Suggested Keywords (select 3-5)
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#737373] mb-2">Primary Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {mockKeywords.primary.map((kw) => (
                        <button
                          key={kw.keyword}
                          onClick={() => toggleKeyword(kw.keyword)}
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm border transition-all",
                            selectedKeywords.includes(kw.keyword)
                              ? "bg-[#171717] text-white border-[#171717]"
                              : "bg-white text-[#404040] border-[#e5e5e5] hover:border-[#171717]"
                          )}
                        >
                          {kw.keyword}
                          <span className="ml-2 text-xs opacity-70">
                            {(kw.volume / 1000).toFixed(1)}K
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#737373] mb-2">Long-Tail Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {mockKeywords.longTail.slice(0, 6).map((kw) => (
                        <button
                          key={kw.keyword}
                          onClick={() => toggleKeyword(kw.keyword)}
                          className={cn(
                            "px-3 py-2 rounded-lg text-xs border transition-all",
                            selectedKeywords.includes(kw.keyword)
                              ? "bg-[#171717] text-white border-[#171717]"
                              : "bg-white text-[#404040] border-[#e5e5e5] hover:border-[#171717]"
                          )}
                        >
                          {kw.keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#737373] mt-3">
                  Selected: {selectedKeywords.length} keywords
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Link href="/article-writer" className="flex-1">
                  <Button variant="ghost" className="w-full">Cancel</Button>
                </Link>
                <Button
                  onClick={handleNext}
                  disabled={!topic || selectedKeywords.length === 0}
                  className="flex-1"
                >
                  Continue to Draft
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Generate Draft (with loading) */}
        {currentStep === 1 && !isGenerating && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6 font-satoshi">
              Generate Draft
            </h2>
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-base text-[#737373] mb-8">
                Ready to generate your article with the selected keywords
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Generate Draft
                </Button>
              </div>
            </div>
          </Card>
        )}
        {currentStep === 1 && isGenerating && <GeneratingLoader />}

        {/* Step 3: SEO Optimization */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-[#171717] mb-6 font-satoshi">
                SEO Optimization
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-3xl font-bold text-[#171717] font-satoshi">
                    {mockSEOScores.overall}
                  </div>
                  <div className="text-xs text-[#737373] mt-1">Overall Score</div>
                </div>
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-3xl font-bold text-[#10b981] font-satoshi">
                    {mockSEOScores.keyword}
                  </div>
                  <div className="text-xs text-[#737373] mt-1">Keyword</div>
                </div>
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-3xl font-bold text-[#ff6b35] font-satoshi">
                    {mockSEOScores.readability}
                  </div>
                  <div className="text-xs text-[#737373] mt-1">Readability</div>
                </div>
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-3xl font-bold text-[#171717] font-satoshi">
                    {mockSEOScores.structure}
                  </div>
                  <div className="text-xs text-[#737373] mt-1">Structure</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#171717]">Optimization Suggestions</h3>
                {mockSEOScores.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#fafafa] rounded-lg">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2",
                      suggestion.priority === "high" && "bg-[#ff6b35]",
                      suggestion.priority === "medium" && "bg-[#ff6b35] opacity-60",
                      suggestion.priority === "low" && "bg-[#737373]"
                    )} />
                    <div className="flex-1">
                      <p className="text-sm text-[#404040]">{suggestion.text}</p>
                      <p className="text-xs text-[#737373] mt-1">{suggestion.type}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="flex-1">Continue to Meta Tags</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 4: Meta Tags */}
        {currentStep === 3 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6 font-satoshi">
              Meta Tags & SEO
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">
                  Meta Title ({metaTitle.length}/60 characters)
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg"
                  maxLength={60}
                />
                <div className="mt-1 h-2 bg-[#e5e5e5] rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      metaTitle.length > 60 ? "bg-[#ff6b35]" : "bg-[#10b981]"
                    )}
                    style={{ width: `${(metaTitle.length / 60) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">
                  Meta Description ({metaDescription.length}/160 characters)
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg"
                  rows={3}
                  maxLength={160}
                />
                <div className="mt-1 h-2 bg-[#e5e5e5] rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      metaDescription.length > 160 ? "bg-[#ff6b35]" : "bg-[#10b981]"
                    )}
                    style={{ width: `${(metaDescription.length / 160) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="flex-1">Continue to Preview</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 5: Preview & Export */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <ArticleEditor
              content={generatedArticle}
              title={topic}
              onSave={handleSave}
            />

            <div className="flex gap-3">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button variant="outline" onClick={() => setCurrentStep(0)} className="flex-1">
                Create New Article
              </Button>
              <Link href="/">
                <Button>Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
