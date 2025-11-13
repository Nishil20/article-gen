"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressStepper } from "@/components/article-writer/ProgressStepper";
import { GeneratingLoader } from "@/components/article-writer/GeneratingLoader";
import { OutlineEditor, OutlineItem } from "@/components/article-generator/OutlineEditor";
import { SectionGenerator } from "@/components/article-generator/SectionGenerator";
import { RichTextEditor } from "@/components/article-generator/RichTextEditor";
import { SEOOptimizer } from "@/components/article-generator/SEOOptimizer";
import { ArticleEditor } from "@/components/article-writer/ArticleEditor";
import { ArrowLeft, Download, Copy, FileText } from "lucide-react";
import { toneOptions, targetAudienceOptions } from "@/lib/mockData/contentTools";
import { Sidebar } from "@/components/sidebar";

interface SectionContent {
  id: string;
  content: string;
  isGenerating: boolean;
}

interface SEOData {
  seoTitle: string;
  metaDescription: string;
  slug: string;
}

export default function ArticleGeneratorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1: Form data
  const [title, setTitle] = useState("");
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [targetWordCount, setTargetWordCount] = useState("1500");
  const [audience, setAudience] = useState("general");
  const [competitorUrl, setCompetitorUrl] = useState("");

  // Step 2: Outline
  const [outline, setOutline] = useState<OutlineItem[]>([]);

  // Step 3: Section content
  const [sections, setSections] = useState<SectionContent[]>([]);

  // Step 4: Full article
  const [articleContent, setArticleContent] = useState("");

  // Step 5: SEO data
  const [seoData, setSeoData] = useState<SEOData>({
    seoTitle: "",
    metaDescription: "",
    slug: "",
  });

  // Step 6: Final article for export
  const [finalArticle, setFinalArticle] = useState("");

  const steps = [
    { id: "details", label: "Article Details", description: "Basic information" },
    { id: "outline", label: "Outline", description: "Generate structure" },
    { id: "sections", label: "Sections", description: "Generate content" },
    { id: "editor", label: "Full Editor", description: "Refine content" },
    { id: "seo", label: "SEO & Meta", description: "Optimize" },
    { id: "export", label: "Export", description: "Publish" },
  ];

  const handleGenerateOutline = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Generate mock outline
      const mockOutline: OutlineItem[] = [
        { id: "heading-1", heading: "Introduction to " + title, level: 2 },
        { id: "heading-2", heading: "Understanding " + primaryKeyword, level: 2 },
        { id: "heading-3", heading: "Key Benefits", level: 2 },
        { id: "heading-4", heading: "Best Practices", level: 2 },
        { id: "heading-5", heading: "Common Challenges", level: 2 },
        { id: "heading-6", heading: "Conclusion", level: 2 },
      ];
      setOutline(mockOutline);
      setSections(
        mockOutline.map((item) => ({
          id: item.id,
          content: "",
          isGenerating: false,
        }))
      );
      setIsGenerating(false);
      setCurrentStep(1);
    }, 2500);
  };

  const handleRegenerateOutline = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newOutline: OutlineItem[] = [
        { id: "heading-1", heading: "Getting Started with " + title, level: 2 },
        { id: "heading-2", heading: "Deep Dive into " + primaryKeyword, level: 2 },
        { id: "heading-3", heading: "Advantages and Benefits", level: 2 },
        { id: "heading-4", heading: "Implementation Guide", level: 2 },
        { id: "heading-5", heading: "Troubleshooting", level: 2 },
        { id: "heading-6", heading: "Final Thoughts", level: 2 },
      ];
      setOutline(newOutline);
      setSections(
        newOutline.map((item) => ({
          id: item.id,
          content: "",
          isGenerating: false,
        }))
      );
      setIsGenerating(false);
    }, 2500);
  };

  const handleGenerateAllSections = () => {
    setSections(sections.map((s) => ({ ...s, isGenerating: true })));

    setTimeout(() => {
      setSections(
        sections.map((section) => ({
          ...section,
          content: generateMockContent(
            outline.find((item) => item.id === section.id)?.heading || ""
          ),
          isGenerating: false,
        }))
      );
    }, 3000);
  };

  const handleProceedToEditor = () => {
    // Combine all sections into full article
    let fullContent = `<h1>${title}</h1>\n\n`;
    sections.forEach((section) => {
      const heading = outline.find((item) => item.id === section.id);
      if (heading) {
        fullContent += `<h2>${heading.heading}</h2>\n${section.content}\n\n`;
      }
    });
    setArticleContent(fullContent);
    setCurrentStep(3);
  };

  const handleProceedToSEO = () => {
    // Auto-populate SEO fields if empty
    if (!seoData.seoTitle) {
      setSeoData({
        seoTitle: title,
        metaDescription: `Learn everything about ${primaryKeyword}. Comprehensive guide covering key concepts, benefits, and best practices.`,
        slug: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      });
    }
    setCurrentStep(4);
  };

  const handleFinish = () => {
    setFinalArticle(articleContent);
    setCurrentStep(5);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    // Mock export functionality
    if (format === "copy") {
      // Strip HTML tags for plain text
      const plainText = finalArticle.replace(/<[^>]*>/g, "");
      navigator.clipboard.writeText(plainText);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setTitle("");
    setPrimaryKeyword("");
    setSecondaryKeywords("");
    setTone("professional");
    setTargetWordCount("1500");
    setAudience("general");
    setCompetitorUrl("");
    setOutline([]);
    setSections([]);
    setArticleContent("");
    setSeoData({ seoTitle: "", metaDescription: "", slug: "" });
    setFinalArticle("");
  };

  const isStep1Valid = title && primaryKeyword && tone && targetWordCount && audience;
  const isStep2Valid = outline.length > 0 && outline.every((item) => item.heading);
  const isStep3Valid = sections.every((s) => s.content.length > 0);
  const isStep5Valid = seoData.seoTitle && seoData.metaDescription && seoData.slug;

  return (
    <div className="min-h-screen bg-[#fafafa] md:ml-64">
      <Sidebar />
      <div className="px-6 md:px-12 py-8 md:py-12">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>

            <div className="mb-8">
              <h1 className="text-[32px] md:text-[48px] font-bold text-[#171717] font-satoshi tracking-[-0.02em] mb-3">
                Article Generator
              </h1>
              <p className="text-lg text-[#737373]">
                Complete end-to-end article creation with outline, sections, editing, and SEO
              </p>
            </div>

            <ProgressStepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={(index) => {
                // Allow navigation to previous completed steps
                if (index < currentStep) {
                  setCurrentStep(index);
                }
              }}
            />
          </div>

          {/* Generating State */}
          {isGenerating && (
            <GeneratingLoader
              steps={
                currentStep === 0
                  ? [
                      "Analyzing your requirements...",
                      "Researching topic structure...",
                      "Generating article outline...",
                    ]
                  : [
                      "Regenerating outline...",
                      "Optimizing structure...",
                      "Finalizing headings...",
                    ]
              }
            />
          )}

          {/* Step 1: Article Details Form */}
          {!isGenerating && currentStep === 0 && (
            <Card className="shadow-default">
              <CardHeader>
                <CardTitle className="text-2xl font-satoshi">
                  Article Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Article Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your article title..."
                    className="bg-[#fafafa] border-[#e5e5e5] h-11"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-keyword">
                      Primary Keyword <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="primary-keyword"
                      value={primaryKeyword}
                      onChange={(e) => setPrimaryKeyword(e.target.value)}
                      placeholder="Main keyword..."
                      className="bg-[#fafafa] border-[#e5e5e5] h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-keywords">
                      Secondary Keywords <span className="text-[#737373]">(Optional)</span>
                    </Label>
                    <Input
                      id="secondary-keywords"
                      value={secondaryKeywords}
                      onChange={(e) => setSecondaryKeywords(e.target.value)}
                      placeholder="Comma-separated keywords..."
                      className="bg-[#fafafa] border-[#e5e5e5] h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tone">
                      Tone <span className="text-red-500">*</span>
                    </Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-[#fafafa] border-[#e5e5e5] h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="word-count">
                      Target Word Count <span className="text-red-500">*</span>
                    </Label>
                    <Select value={targetWordCount} onValueChange={setTargetWordCount}>
                      <SelectTrigger className="bg-[#fafafa] border-[#e5e5e5] h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">500 words</SelectItem>
                        <SelectItem value="1000">1,000 words</SelectItem>
                        <SelectItem value="1500">1,500 words</SelectItem>
                        <SelectItem value="2000">2,000 words</SelectItem>
                        <SelectItem value="2500">2,500 words</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="audience">
                      Target Audience <span className="text-red-500">*</span>
                    </Label>
                    <Select value={audience} onValueChange={setAudience}>
                      <SelectTrigger className="bg-[#fafafa] border-[#e5e5e5] h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {targetAudienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competitor-url">
                      Competitor URL <span className="text-[#737373]">(Optional)</span>
                    </Label>
                    <Input
                      id="competitor-url"
                      value={competitorUrl}
                      onChange={(e) => setCompetitorUrl(e.target.value)}
                      placeholder="https://competitor.com/article"
                      className="bg-[#fafafa] border-[#e5e5e5] h-11"
                      type="url"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-[#e5e5e5]">
                  <Button
                    onClick={handleGenerateOutline}
                    disabled={!isStep1Valid}
                    size="lg"
                  >
                    Next: Generate Outline
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Outline Editor */}
          {!isGenerating && currentStep === 1 && (
            <Card className="shadow-default">
              <CardContent className="p-6 md:p-8">
                <OutlineEditor
                  outline={outline}
                  onOutlineChange={setOutline}
                  onRegenerate={handleRegenerateOutline}
                  isRegenerating={isGenerating}
                />

                <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#e5e5e5]">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(0)}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!isStep2Valid}
                    size="lg"
                  >
                    Next: Generate Sections
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Section Generator */}
          {!isGenerating && currentStep === 2 && (
            <Card className="shadow-default">
              <CardContent className="p-6 md:p-8">
                <SectionGenerator
                  outline={outline}
                  sections={sections}
                  onSectionsChange={setSections}
                  onGenerateAll={handleGenerateAllSections}
                />

                <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#e5e5e5]">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleProceedToEditor}
                    disabled={!isStep3Valid}
                    size="lg"
                  >
                    Next: Full Editor
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Rich Text Editor */}
          {!isGenerating && currentStep === 3 && (
            <Card className="shadow-default">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#171717] font-satoshi tracking-[-0.02em]">
                    Full Article Editor
                  </h3>
                  <p className="text-sm text-[#737373] mt-1">
                    Refine and edit your complete article
                  </p>
                </div>

                <RichTextEditor
                  content={articleContent}
                  onChange={setArticleContent}
                  placeholder="Your article content..."
                />

                <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#e5e5e5]">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </Button>
                  <Button onClick={handleProceedToSEO} size="lg">
                    Next: SEO Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: SEO & Meta Details */}
          {!isGenerating && currentStep === 4 && (
            <div>
              <SEOOptimizer
                seoData={seoData}
                onSEODataChange={setSeoData}
                primaryKeyword={primaryKeyword}
                secondaryKeywords={secondaryKeywords.split(",").map((k) => k.trim()).filter(Boolean)}
                articleContent={articleContent}
              />

              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(3)}
                >
                  Back
                </Button>
                <Button onClick={handleFinish} disabled={!isStep5Valid} size="lg">
                  Finish & Export
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Export/Publish */}
          {!isGenerating && currentStep === 5 && (
            <Card className="shadow-default">
              <CardContent className="p-6 md:p-8">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#10b981] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#10b981]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#171717] font-satoshi tracking-[-0.02em] mb-2">
                    Article Complete!
                  </h3>
                  <p className="text-[#737373] mb-8">
                    Your article is ready to export and publish
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    <Button
                      variant="outline"
                      onClick={() => handleExport("copy")}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy to Clipboard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleExport("markdown")}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export Markdown
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleExport("html")}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export HTML
                    </Button>
                  </div>

                  <div className="bg-[#fafafa] rounded-lg p-6 text-left border border-[#e5e5e5]">
                    <h4 className="font-bold text-[#171717] mb-4 font-satoshi">
                      Article Preview
                    </h4>
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: finalArticle }}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep(4)}
                    >
                      Back to SEO
                    </Button>
                    <Button onClick={handleReset} size="lg">
                      Create New Article
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Mock content generator
function generateMockContent(heading: string): string {
  return `<p>This section covers ${heading.toLowerCase()}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>`;
}
