"use client";

import * as React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomizationPanel } from "@/components/content-tools/CustomizationPanel";
import { GeneratingLoader } from "@/components/article-writer/GeneratingLoader";
import { ArticleEditor } from "@/components/article-writer/ArticleEditor";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import {
  toneOptions,
  paragraphLengthOptions,
  targetAudienceOptions,
  paragraphCountOptions,
} from "@/lib/mockData/contentTools";

export default function ParagraphGeneratorPage() {
  const [topic, setTopic] = React.useState("");
  const [keywords, setKeywords] = React.useState("");
  const [tone, setTone] = React.useState("professional");
  const [length, setLength] = React.useState("medium");
  const [targetAudience, setTargetAudience] = React.useState("general");
  const [paragraphCount, setParagraphCount] = React.useState("3");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState("");
  const [error, setError] = React.useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      // Call the API route
      const response = await fetch('/api/generate-paragraph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          keywords,
          tone,
          length,
          targetAudience,
          paragraphCount: parseInt(paragraphCount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      // Format the content with metadata
      const formattedContent = `# ${topic}\n\n${data.content}\n\n---\n\n**Generation Settings:**\n- Tone: ${tone}\n- Length: ${length}\n- Target Audience: ${targetAudience}\n- Number of Paragraphs: ${paragraphCount}\n- Keywords: ${keywords || "None"}\n\n**AI Model:**\n- Model: ${data.metadata?.model || 'GPT-3.5 Turbo'}\n- Temperature: ${data.metadata?.temperature || 0.7}`;

      setGeneratedContent(formattedContent);
      setIsGenerating(false);
    } catch (err: any) {
      console.error('Error generating content:', err);
      setError(err.message || 'Failed to generate content. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    alert("Content saved to My Content! (Mock functionality)");
  };

  const handleReset = () => {
    setTopic("");
    setKeywords("");
    setTone("professional");
    setLength("medium");
    setTargetAudience("general");
    setParagraphCount("3");
    setGeneratedContent("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <div className="border-b">
          <div className="px-6 md:px-12 py-6 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                <h1 className="text-3xl font-bold tracking-tight">Paragraph Generator</h1>
              </div>
            </div>
            <p className="text-muted-foreground ml-12">
              Generate high-quality paragraphs on any topic with AI
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="px-6 md:px-12 py-8 max-w-[1400px] mx-auto">
          {/* Error Message */}
          {error && (
            <Card className="mb-6 border-destructive bg-destructive/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-destructive text-sm font-bold">!</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-destructive mb-1">Error</h3>
                    <p className="text-sm text-destructive/90">{error}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setError("")}
                    className="text-destructive hover:text-destructive"
                  >
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!isGenerating && !generatedContent ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Input */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Details</CardTitle>
                    <CardDescription>
                      Enter your topic and any keywords to include
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Topic Input */}
                    <div className="space-y-2">
                      <Label htmlFor="topic">
                        Topic <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., The benefits of meditation for mental health"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the main topic for your paragraphs
                      </p>
                    </div>

                    {/* Keywords Input */}
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (Optional)</Label>
                      <Input
                        id="keywords"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="e.g., mindfulness, stress relief, wellness"
                      />
                      <p className="text-xs text-muted-foreground">
                        Comma-separated keywords to include in the content
                      </p>
                    </div>

                    {/* Number of Paragraphs */}
                    <div className="space-y-2">
                      <Label htmlFor="paragraph-count">Number of Paragraphs</Label>
                      <Select value={paragraphCount} onValueChange={setParagraphCount}>
                        <SelectTrigger id="paragraph-count">
                          <SelectValue placeholder="Select number of paragraphs" />
                        </SelectTrigger>
                        <SelectContent>
                          {paragraphCountOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Customization */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Customization</CardTitle>
                    <CardDescription>
                      Adjust tone, length, and audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CustomizationPanel
                      tone={tone}
                      setTone={setTone}
                      toneOptions={toneOptions}
                      length={length}
                      setLength={setLength}
                      lengthOptions={paragraphLengthOptions}
                      targetAudience={targetAudience}
                      setTargetAudience={setTargetAudience}
                      targetAudienceOptions={targetAudienceOptions}
                    />

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-4">
                      <Button
                        onClick={handleGenerate}
                        disabled={!topic.trim()}
                        className="w-full"
                        size="lg"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Paragraphs
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="w-full"
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : isGenerating ? (
            <GeneratingLoader />
          ) : (
            <div className="space-y-6">
              <ArticleEditor
                content={generatedContent}
                title={topic}
                onSave={handleSave}
              />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Another
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
    </div>
  );
}
