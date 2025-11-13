"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

interface SEOData {
  seoTitle: string;
  metaDescription: string;
  slug: string;
}

interface SEOOptimizerProps {
  seoData: SEOData;
  onSEODataChange: (data: SEOData) => void;
  primaryKeyword: string;
  secondaryKeywords: string[];
  articleContent: string;
}

export function SEOOptimizer({
  seoData,
  onSEODataChange,
  primaryKeyword,
  secondaryKeywords,
  articleContent,
}: SEOOptimizerProps) {
  // Calculate keyword coverage
  const contentLower = articleContent.toLowerCase();
  const primaryKeywordCount = (
    contentLower.match(new RegExp(primaryKeyword.toLowerCase(), "g")) || []
  ).length;

  const secondaryKeywordCoverage = secondaryKeywords.map((keyword) => ({
    keyword,
    count: (
      contentLower.match(new RegExp(keyword.toLowerCase(), "g")) || []
    ).length,
  }));

  // Calculate readability score (simplified)
  const wordCount = articleContent.split(/\s+/).length;
  const sentenceCount = (articleContent.match(/[.!?]+/g) || []).length;
  const avgWordsPerSentence =
    sentenceCount > 0 ? wordCount / sentenceCount : 0;

  let readabilityScore = 100;
  if (avgWordsPerSentence > 25) readabilityScore -= 30;
  else if (avgWordsPerSentence > 20) readabilityScore -= 15;

  let readabilityLabel = "Excellent";
  let readabilityColor = "text-[#10b981]";
  if (readabilityScore < 70) {
    readabilityLabel = "Good";
    readabilityColor = "text-[#8b5cf6]";
  }
  if (readabilityScore < 50) {
    readabilityLabel = "Needs Improvement";
    readabilityColor = "text-[#ff6b35]";
  }

  const handleChange = (field: keyof SEOData, value: string) => {
    onSEODataChange({
      ...seoData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* SEO Metadata Form */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] mb-6">
          SEO & Meta Details
        </h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="seo-title">
              SEO Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="seo-title"
              value={seoData.seoTitle}
              onChange={(e) => handleChange("seoTitle", e.target.value)}
              placeholder="Enter SEO-optimized title..."
              className="bg-[#fafafa] border-[#e5e5e5] h-11"
              maxLength={60}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737373]">
                Recommended: 50-60 characters
              </span>
              <span
                className={
                  seoData.seoTitle.length > 60
                    ? "text-[#ff6b35]"
                    : seoData.seoTitle.length > 50
                    ? "text-[#10b981]"
                    : "text-[#737373]"
                }
              >
                {seoData.seoTitle.length}/60
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta-description">
              Meta Description <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="meta-description"
              value={seoData.metaDescription}
              onChange={(e) =>
                handleChange("metaDescription", e.target.value.slice(0, 160))
              }
              placeholder="Write a compelling meta description..."
              className="w-full min-h-[100px] px-4 py-3 text-sm text-[#404040] placeholder:text-[#a3a3a3] rounded-lg border border-[#e5e5e5] bg-[#fafafa] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 leading-[1.6]"
              maxLength={160}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737373]">
                Recommended: 150-160 characters
              </span>
              <span
                className={
                  seoData.metaDescription.length > 160
                    ? "text-[#ff6b35]"
                    : seoData.metaDescription.length > 150
                    ? "text-[#10b981]"
                    : "text-[#737373]"
                }
              >
                {seoData.metaDescription.length}/160
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              URL Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              value={seoData.slug}
              onChange={(e) =>
                handleChange(
                  "slug",
                  e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
                )
              }
              placeholder="article-url-slug"
              className="bg-[#fafafa] border-[#e5e5e5] h-11 font-mono text-sm"
            />
            <p className="text-xs text-[#737373]">
              URL-friendly version: lowercase, hyphens only
            </p>
          </div>
        </div>
      </div>

      {/* Keyword Coverage */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] mb-6">
          Keyword Coverage
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-[#fafafa] rounded-lg">
            {primaryKeywordCount >= 3 ? (
              <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
            ) : primaryKeywordCount >= 1 ? (
              <AlertCircle className="w-5 h-5 text-[#ff6b35] flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-[#a3a3a3] flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-[#171717]">
                Primary Keyword: {primaryKeyword}
              </p>
              <p className="text-xs text-[#737373] mt-1">
                Used {primaryKeywordCount} time{primaryKeywordCount !== 1 ? "s" : ""}{" "}
                {primaryKeywordCount < 3 && "(recommended: 3-5 times)"}
              </p>
            </div>
          </div>

          {secondaryKeywords.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#171717]">
                Secondary Keywords:
              </p>
              {secondaryKeywordCoverage.map(({ keyword, count }) => (
                <div
                  key={keyword}
                  className="flex items-center gap-3 p-3 bg-[#fafafa] rounded-lg"
                >
                  {count >= 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                  ) : count >= 1 ? (
                    <AlertCircle className="w-4 h-4 text-[#ff6b35] flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#a3a3a3] flex-shrink-0" />
                  )}
                  <span className="text-sm text-[#404040] flex-1">
                    {keyword}
                  </span>
                  <span className="text-xs text-[#737373]">
                    {count} time{count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Readability Score */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] mb-6">
          Readability Analysis
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">Readability Score</span>
            <span className={`text-2xl font-bold ${readabilityColor}`}>
              {readabilityScore}/100
            </span>
          </div>

          <div className="w-full bg-[#f5f5f5] rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                readabilityScore >= 70
                  ? "bg-[#10b981]"
                  : readabilityScore >= 50
                  ? "bg-[#8b5cf6]"
                  : "bg-[#ff6b35]"
              }`}
              style={{ width: `${readabilityScore}%` }}
            />
          </div>

          <p className={`text-sm font-medium ${readabilityColor}`}>
            {readabilityLabel}
          </p>

          <div className="pt-4 border-t border-[#e5e5e5] space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Word Count</span>
              <span className="font-medium text-[#171717]">{wordCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Average Words/Sentence</span>
              <span className="font-medium text-[#171717]">
                {avgWordsPerSentence.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
