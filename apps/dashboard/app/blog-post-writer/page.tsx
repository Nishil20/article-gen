"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressStepper } from "@/components/article-writer/ProgressStepper";
import { GeneratingLoader } from "@/components/article-writer/GeneratingLoader";
import { ArticleEditor } from "@/components/article-writer/ArticleEditor";

type Step = {
  id: string;
  label: string;
  description: string;
};

const steps: Step[] = [
  { id: "1", label: "Details", description: "Basic Information" },
  { id: "2", label: "Title", description: "Choose a Title" },
  { id: "3", label: "Intro", description: "Create Introduction" },
  { id: "4", label: "Outline", description: "Structure Your Post" },
  { id: "5", label: "Content", description: "Generate Content" },
];

export default function BlogPostWriterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  // Step 1 - Details
  const [language, setLanguage] = useState("en-us");
  const [creativity, setCreativity] = useState("regular");
  const [description, setDescription] = useState("");
  const [targetedKeyword, setTargetedKeyword] = useState("");

  // Step 2 - Title
  const [selectedTitle, setSelectedTitle] = useState("");
  const [titleOptions, setTitleOptions] = useState<string[]>([]);

  // Step 3 - Intro
  const [intro, setIntro] = useState("");

  // Step 4 - Outline
  const [outline, setOutline] = useState<string[]>([]);

  // Mock generated content
  const mockBlogPost = `# ${selectedTitle || "How to Master Content Marketing in 2024"}

${intro || "Content marketing has evolved dramatically over the past few years. In this comprehensive guide, we'll explore the latest strategies and techniques to help you succeed in today's digital landscape."}

## ${outline[0] || "Understanding Your Audience"}

Understanding your target audience is the foundation of effective content marketing. By creating detailed buyer personas and analyzing user behavior, you can tailor your content to meet their specific needs and preferences.

## ${outline[1] || "Creating Compelling Content"}

Quality content is what sets successful marketers apart. Focus on providing real value to your readers through well-researched, engaging, and actionable content that addresses their pain points.

## ${outline[2] || "Distribution and Promotion"}

Creating great content is only half the battle. You need a solid distribution strategy to ensure your content reaches the right people at the right time. Leverage social media, email marketing, and SEO to maximize your reach.

## ${outline[3] || "Measuring Success"}

Track key metrics like engagement rates, conversion rates, and ROI to understand what's working and what needs improvement. Use data-driven insights to continuously refine your content strategy.

## Conclusion

Content marketing success requires a strategic approach, consistent effort, and a willingness to adapt. By following these guidelines and staying current with industry trends, you'll be well-positioned to achieve your marketing goals.`;

  const handleNext = () => {
    if (currentStep === 1) {
      if (description.length < 40) return;
      setIsGenerating(true);
      setTimeout(() => {
        setTitleOptions([
          `How to ${description.slice(0, 50)}... in 2024`,
          `The Ultimate Guide to ${description.slice(0, 40)}`,
          `10 Proven Ways to ${description.slice(0, 45)}`,
          `${description.slice(0, 60)}: A Complete Guide`,
        ]);
        setIsGenerating(false);
        setCurrentStep(2);
      }, 2000);
    } else if (currentStep === 2) {
      if (!selectedTitle) return;
      setIsGenerating(true);
      setTimeout(() => {
        setIntro(
          `In today's digital landscape, understanding ${targetedKeyword || "the topic"} is more important than ever. This comprehensive guide will walk you through everything you need to know to succeed.`
        );
        setIsGenerating(false);
        setCurrentStep(3);
      }, 2000);
    } else if (currentStep === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setOutline([
          "Understanding the Fundamentals",
          "Best Practices and Strategies",
          "Common Mistakes to Avoid",
          "Advanced Techniques",
        ]);
        setIsGenerating(false);
        setCurrentStep(4);
      }, 2000);
    } else if (currentStep === 4) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentStep(5);
        setShowOutput(true);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowOutput(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setDescription("");
    setTargetedKeyword("");
    setSelectedTitle("");
    setTitleOptions([]);
    setIntro("");
    setOutline([]);
    setShowOutput(false);
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return description.length < 40;
    if (currentStep === 2) return !selectedTitle;
    return false;
  };

  if (showOutput) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Sidebar />
        <div className="md:ml-64">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 md:py-12">
            <ArticleEditor
              content={mockBlogPost}
              onBack={handleReset}
              onSave={() => {
                alert("Blog post saved to your content library!");
                router.push("/content");
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Sidebar />
      <div className="md:ml-64">
        <main className="px-6 md:px-12 py-6 md:py-10">
          {/* Back Button */}
          <div className="max-w-[1400px] mx-auto mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="mb-6 -ml-2 text-[#404040] hover:text-[#171717]"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </Button>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-[32px] md:text-[48px] font-bold text-[#171717] mb-3 font-satoshi tracking-[-0.02em] leading-[1.1]">
                Write quality blog posts with AI
              </h1>
              <p className="text-base md:text-lg text-[#737373] leading-[1.6]">
                Go from a blog idea to an engaging blog post in minutes by following the steps below.
              </p>
            </div>

            {/* Progress Stepper */}
            <div className="mb-8">
              <ProgressStepper
                steps={steps}
                currentStep={currentStep - 1}
                onStepClick={(stepIndex) => {
                  const step = stepIndex + 1;
                  if (step < currentStep) {
                    setCurrentStep(step);
                    setShowOutput(false);
                  }
                }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-[800px] mx-auto mt-2">
            {isGenerating ? (
              <div className="flex items-center justify-center py-20">
                <GeneratingLoader
                  steps={[
                    "Analyzing your requirements...",
                    "Generating ideas...",
                    "Creating content...",
                    "Finalizing your blog post...",
                  ]}
                />
              </div>
            ) : (
              <div className="bg-white border border-[#e5e5e5] rounded-xl p-8 md:p-10">
                {/* Step 1 - Details */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] leading-[1.2] mb-2">
                        Step 1: Details
                      </h2>
                      <p className="text-base text-[#737373]">
                        Describe the blog post that you want to create.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Language */}
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-sm font-medium text-[#171717]">
                          Language
                        </Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-full bg-[#fafafa] border-[#e5e5e5] h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en-us">🇺🇸 English (US)</SelectItem>
                            <SelectItem value="en-uk">🇬🇧 English (UK)</SelectItem>
                            <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                            <SelectItem value="fr">🇫🇷 French</SelectItem>
                            <SelectItem value="de">🇩🇪 German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Creativity */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="creativity" className="text-sm font-medium text-[#171717]">
                            Creativity
                          </Label>
                          <span className="text-xs text-[#737373]" title="Controls the creativity level of the generated content">
                            ⓘ
                          </span>
                        </div>
                        <Select value={creativity} onValueChange={setCreativity}>
                          <SelectTrigger className="w-full bg-[#fafafa] border-[#e5e5e5] h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-[#171717]">
                        What do you want to write about?
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                          placeholder="Explain what is your blog post about (min. 40 characters). e.g. A blog article explaining how copywriting can drive more traffic to your website."
                          className="w-full min-h-[100px] px-4 py-3 text-sm text-[#404040] placeholder:text-[#a3a3a3] rounded-lg border border-[#e5e5e5] bg-[#fafafa] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 leading-[1.6]"
                          maxLength={200}
                        />
                        <span className="absolute bottom-3 right-3 text-sm text-[#737373]">
                          {description.length}/200
                        </span>
                      </div>
                      {description.length > 0 && description.length < 40 && (
                        <p className="text-sm text-[#ff6b35] flex items-center gap-1.5">
                          <span>⚠</span>
                          {40 - description.length} more characters needed in your description.
                        </p>
                      )}
                    </div>

                    {/* Targeted Keyword */}
                    <div className="space-y-2">
                      <Label htmlFor="keyword" className="text-sm font-medium text-[#171717]">
                        Targeted Keyword (optional)
                      </Label>
                      <Input
                        id="keyword"
                        type="text"
                        value={targetedKeyword}
                        onChange={(e) => setTargetedKeyword(e.target.value)}
                        placeholder="e.g. ai copywriting"
                        className="bg-[#fafafa] border-[#e5e5e5] h-11"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 - Title */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] leading-[1.2] mb-2">
                        Step 2: Title
                      </h2>
                      <p className="text-base text-[#737373]">
                        Choose a title for your blog post.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {titleOptions.map((title, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedTitle(title)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedTitle === title
                              ? "border-[#171717] bg-[#fafafa] shadow-sm"
                              : "border-[#e5e5e5] hover:border-[#737373] hover:bg-[#fafafa]"
                          }`}
                        >
                          <p className="text-base text-[#171717] leading-[1.6]">{title}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#e5e5e5]">
                      <Label htmlFor="custom-title" className="text-sm font-medium text-[#171717]">
                        Or write your own
                      </Label>
                      <Input
                        id="custom-title"
                        type="text"
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                        placeholder="Enter custom title..."
                        className="bg-[#fafafa] border-[#e5e5e5] h-11"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 - Intro */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] leading-[1.2] mb-2">
                        Step 3: Intro
                      </h2>
                      <p className="text-base text-[#737373]">
                        Review and edit your introduction.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="intro" className="text-sm font-medium text-[#171717]">
                        Introduction
                      </Label>
                      <textarea
                        id="intro"
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        className="w-full min-h-[140px] px-4 py-3 text-sm text-[#404040] rounded-lg border border-[#e5e5e5] bg-[#fafafa] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 leading-[1.6]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4 - Outline */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] leading-[1.2] mb-2">
                        Step 4: Outline
                      </h2>
                      <p className="text-base text-[#737373]">
                        Review and edit your blog outline.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {outline.map((section, index) => (
                        <div key={index} className="space-y-2">
                          <Label htmlFor={`section-${index}`} className="text-sm font-medium text-[#171717]">
                            Section {index + 1}
                          </Label>
                          <Input
                            id={`section-${index}`}
                            type="text"
                            value={section}
                            onChange={(e) => {
                              const newOutline = [...outline];
                              newOutline[index] = e.target.value;
                              setOutline(newOutline);
                            }}
                            className="bg-[#fafafa] border-[#e5e5e5] h-11"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#e5e5e5]">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="text-[#404040] hover:text-[#171717] disabled:opacity-40"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                    className="min-w-[140px] bg-[#171717] text-white hover:bg-[#404040] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {currentStep === 4 ? "Generate Content" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
