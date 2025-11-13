"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressStepper } from "@/components/article-writer/ProgressStepper";
import { GeneratingLoader } from "@/components/article-writer/GeneratingLoader";
import { ArticleEditor } from "@/components/article-writer/ArticleEditor";
import {
  toneOptions,
  lengthOptions,
  mockQuickArticles,
} from "@/lib/mockData/articleGenerator";

const steps = [
  { id: "topic", label: "Enter Topic", description: "What to write about" },
  { id: "generate", label: "Generate", description: "AI creates article" },
  { id: "preview", label: "Preview & Export", description: "Download or save" },
];

export default function QuickWorkflowPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [topic, setTopic] = React.useState("");
  const [tone, setTone] = React.useState("professional");
  const [length, setLength] = React.useState("medium");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedArticle, setGeneratedArticle] = React.useState("");

  const handleNext = () => {
    if (currentStep === 0) {
      // Start generation
      setCurrentStep(1);
      setIsGenerating(true);

      // Simulate AI generation with timeout
      setTimeout(() => {
        const lengthData =
          length === "short"
            ? mockQuickArticles.short
            : length === "medium"
            ? mockQuickArticles.medium
            : mockQuickArticles.long;

        setGeneratedArticle(lengthData.content);
        setIsGenerating(false);
        setCurrentStep(2);
      }, 8000); // 8 seconds mock delay
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && currentStep !== 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    alert("Article saved to My Content! (Mock functionality)");
  };

  const handleNewArticle = () => {
    setCurrentStep(0);
    setTopic("");
    setTone("professional");
    setLength("medium");
    setGeneratedArticle("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/old-article-writer"
              className="text-[#737373] hover:text-[#171717] transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-[#171717] font-satoshi tracking-[-0.02em]">
                Quick Article Generator
              </h1>
              <Badge variant="success">⚡ Fast</Badge>
            </div>
          </div>

          {/* Progress Stepper */}
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-12">
        {/* Step 1: Enter Topic */}
        {currentStep === 0 && (
          <Card className="p-8 md:p-12">
            <div className="max-w-[600px] mx-auto">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">✍️</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#171717] mb-3 font-satoshi">
                  What do you want to write about?
                </h2>
                <p className="text-base text-[#737373] leading-[1.6]">
                  Enter your topic and let AI create a comprehensive article for
                  you.
                </p>
              </div>

              <div className="space-y-6">
                {/* Topic Input */}
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-[#404040] mb-2"
                  >
                    Article Topic <span className="text-[#ff6b35]">*</span>
                  </label>
                  <textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., How to start a successful blog in 2024"
                    rows={3}
                    className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-[#404040] placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-all"
                  />
                  <p className="mt-2 text-xs text-[#737373]">
                    Be specific for better results
                  </p>
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {toneOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTone(option.value)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          tone === option.value
                            ? "bg-[#171717] text-white"
                            : "bg-[#fafafa] text-[#404040] border border-[#e5e5e5] hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Article Length
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {lengthOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setLength(option.value)}
                        className={`px-4 py-3 rounded-lg text-sm transition-all ${
                          length === option.value
                            ? "bg-[#171717] text-white"
                            : "bg-[#fafafa] text-[#404040] border border-[#e5e5e5] hover:bg-[#f5f5f5]"
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs opacity-75 mt-1">
                          ~{option.wordCount} words
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6">
                  <Link href="/old-article-writer" className="flex-1">
                    <Button variant="ghost" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    onClick={handleNext}
                    disabled={!topic.trim()}
                    className="flex-1"
                  >
                    Generate Article
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Generating */}
        {currentStep === 1 && isGenerating && <GeneratingLoader />}

        {/* Step 3: Preview & Export */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <ArticleEditor
              content={generatedArticle}
              title={topic || "Generated Article"}
              onSave={handleSave}
            />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleNewArticle}
                className="flex-1"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Another Article
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="ghost" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
