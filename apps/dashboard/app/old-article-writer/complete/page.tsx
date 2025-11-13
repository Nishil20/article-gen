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
  mockKeywords,
  mockContentBrief,
  mockOutline,
  mockArticle,
  mockSEOScores,
  mockMetaTags,
  mockImages,
  mockPublishingData,
  mockRankingData,
} from "@/lib/mockData/articleGenerator";
import { cn } from "@/lib/utils";

const steps = [
  { id: "keywords", label: "Keywords" },
  { id: "brief", label: "Brief" },
  { id: "outline", label: "Outline" },
  { id: "draft", label: "Draft" },
  { id: "seo", label: "SEO" },
  { id: "meta", label: "Meta Tags" },
  { id: "images", label: "Images" },
  { id: "publishing", label: "Publishing" },
  { id: "results", label: "Results" },
];

export default function CompleteWorkflowPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [topic, setTopic] = React.useState("");
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);
  const [generatedArticle, setGeneratedArticle] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleNext = () => {
    // Generate article on step 3 (Draft)
    if (currentStep === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setGeneratedArticle(mockArticle);
        setIsGenerating(false);
        setCurrentStep(4);
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
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/old-article-writer"
              className="text-[#737373] hover:text-[#171717] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-[#171717] font-satoshi tracking-[-0.02em]">
                Complete Workflow
              </h1>
              <Badge variant="outline">🚀 Advanced</Badge>
            </div>
          </div>
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-12">
        {/* Step 1: Keyword Research */}
        {currentStep === 0 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6 font-satoshi">
              Keyword Research & Clustering
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">
                  Primary Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="AI content generation"
                  className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#171717] mb-3">
                    Primary Keywords
                  </h3>
                  {mockKeywords.primary.map((kw) => (
                    <div
                      key={kw.keyword}
                      className="flex items-center justify-between p-3 mb-2 bg-[#fafafa] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedKeywords.includes(kw.keyword)}
                          onChange={() => toggleKeyword(kw.keyword)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-[#404040]">{kw.keyword}</span>
                      </div>
                      <div className="flex gap-3 text-xs text-[#737373]">
                        <span>{(kw.volume / 1000).toFixed(1)}K vol</span>
                        <span>Diff: {kw.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#171717] mb-3">
                    Long-Tail Keywords
                  </h3>
                  {mockKeywords.longTail.slice(0, 5).map((kw) => (
                    <div
                      key={kw.keyword}
                      className="flex items-center justify-between p-3 mb-2 bg-[#fafafa] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedKeywords.includes(kw.keyword)}
                          onChange={() => toggleKeyword(kw.keyword)}
                          className="w-4 h-4"
                        />
                        <span className="text-xs text-[#404040]">{kw.keyword}</span>
                      </div>
                      <span className="text-xs text-[#737373]">{kw.volume} vol</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/old-article-writer">
                  <Button variant="ghost">Cancel</Button>
                </Link>
                <Button onClick={handleNext} disabled={selectedKeywords.length === 0} className="flex-1">
                  Continue to Brief
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Content Brief */}
        {currentStep === 1 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6 font-satoshi">
              Content Brief Creation
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#fafafa] rounded-lg">
                <p className="text-xs font-medium text-[#737373] mb-1">SEO Title</p>
                <p className="text-sm text-[#404040]">{mockContentBrief.seoTitle}</p>
              </div>
              <div className="p-4 bg-[#fafafa] rounded-lg">
                <p className="text-xs font-medium text-[#737373] mb-1">Meta Description</p>
                <p className="text-sm text-[#404040]">{mockContentBrief.metaDescription}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#fafafa] rounded-lg">
                  <p className="text-xs font-medium text-[#737373] mb-1">Target Word Count</p>
                  <p className="text-lg font-bold text-[#171717]">{mockContentBrief.wordCount}</p>
                </div>
                <div className="p-4 bg-[#fafafa] rounded-lg">
                  <p className="text-xs font-medium text-[#737373] mb-1">Tone</p>
                  <p className="text-sm text-[#404040]">{mockContentBrief.tone}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="flex-1">Continue to Outline</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Outline Expansion */}
        {currentStep === 2 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6 font-satoshi">
              Outline Expansion
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#f5f5f5] rounded-lg">
                <h3 className="text-lg font-bold text-[#171717] mb-2">{mockOutline.h1}</h3>
              </div>
              {mockOutline.sections.slice(0, 4).map((section, index) => (
                <div key={index} className="pl-4 border-l-2 border-[#e5e5e5]">
                  <h4 className="text-base font-semibold text-[#171717] mb-2">{section.h2}</h4>
                  <ul className="space-y-1 ml-4">
                    {section.h3s.map((h3, i) => (
                      <li key={i} className="text-sm text-[#737373]">• {h3}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-xs text-[#737373]">+ {mockOutline.sections.length - 4} more sections...</p>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="flex-1">Generate Draft</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Draft Generation (with loading) */}
        {currentStep === 3 && !isGenerating && (
          <Card className="p-8">
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-[#171717] mb-3">Ready to Generate</h2>
              <p className="text-base text-[#737373]">Click below to generate your full article</p>
              <div className="flex gap-3 justify-center mt-8">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Generate Full Article</Button>
              </div>
            </div>
          </Card>
        )}
        {currentStep === 3 && isGenerating && <GeneratingLoader />}

        {/* Steps 5-8: Abbreviated for brevity, similar pattern to Standard workflow */}
        {currentStep === 4 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6">SEO Optimization</h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {["Overall", "Keyword", "Readability", "Structure"].map((label, i) => (
                <div key={label} className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-3xl font-bold text-[#171717]">
                    {[mockSEOScores.overall, mockSEOScores.keyword, mockSEOScores.readability, mockSEOScores.structure][i]}
                  </div>
                  <div className="text-xs text-[#737373] mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} className="flex-1">Continue to Meta Tags</Button>
            </div>
          </Card>
        )}

        {currentStep === 5 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6">Meta Tags & Schema</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <input type="text" value={mockMetaTags.title} readOnly className="w-full px-4 py-3 border rounded-lg mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <textarea value={mockMetaTags.description} readOnly rows={3} className="w-full px-4 py-3 border rounded-lg mt-2" />
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="flex-1">Continue to Images</Button>
              </div>
            </div>
          </Card>
        )}

        {currentStep === 6 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6">Image Generation</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockImages.map((img) => (
                <div key={img.id} className="border rounded-lg p-4">
                  <div className="w-full h-40 bg-[#f5f5f5] rounded-lg flex items-center justify-center mb-3">
                    <span className="text-4xl">🖼️</span>
                  </div>
                  <p className="text-xs text-[#737373]">{img.alt}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} className="flex-1">Continue to Publishing</Button>
            </div>
          </Card>
        )}

        {currentStep === 7 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[#171717] mb-6">Publishing Setup</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">URL Slug</label>
                <input type="text" value={mockPublishingData.url} readOnly className="w-full px-4 py-3 border rounded-lg mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Categories</label>
                <div className="flex gap-2 mt-2">
                  {mockPublishingData.categories.map((cat) => (
                    <Badge key={cat}>{cat}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="flex-1">View Results</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 9: Results & Tracking */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <ArticleEditor content={generatedArticle} title={topic || "Generated Article"} onSave={() => alert("Saved!")} />
            <Card className="p-8">
              <h3 className="text-xl font-bold text-[#171717] mb-4">Performance Tracking</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-2xl font-bold text-[#171717]">{mockRankingData.impressions.toLocaleString()}</div>
                  <div className="text-xs text-[#737373]">Impressions</div>
                </div>
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-2xl font-bold text-[#171717]">{mockRankingData.clicks}</div>
                  <div className="text-xs text-[#737373]">Clicks</div>
                </div>
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-2xl font-bold text-[#171717]">{mockRankingData.ctr}%</div>
                  <div className="text-xs text-[#737373]">CTR</div>
                </div>
                <div className="text-center p-4 bg-[#fafafa] rounded-lg">
                  <div className="text-2xl font-bold text-[#171717]">{mockRankingData.avgPosition}</div>
                  <div className="text-xs text-[#737373]">Avg Position</div>
                </div>
              </div>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(0)} className="flex-1">Create New Article</Button>
              <Link href="/"><Button>Back to Dashboard</Button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
