"use client";

import * as React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentInput } from "@/components/content-tools/ContentInput";
import { CustomizationPanel } from "@/components/content-tools/CustomizationPanel";
import { GeneratingLoader } from "@/components/article-writer/GeneratingLoader";
import { ArticleEditor } from "@/components/article-writer/ArticleEditor";
import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import {
  toneOptions,
  lengthOptions,
  targetAudienceOptions,
} from "@/lib/mockData/contentTools";

export default function ContentRewriterPage() {
  const [content, setContent] = React.useState("");
  const [tone, setTone] = React.useState("professional");
  const [length, setLength] = React.useState("same");
  const [targetAudience, setTargetAudience] = React.useState("general");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [rewrittenContent, setRewrittenContent] = React.useState("");
  const [error, setError] = React.useState("");

  const handleRewrite = async () => {
    if (!content.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      // Call the API route
      const response = await fetch('/api/rewrite-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          tone,
          length,
          targetAudience,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to rewrite content');
      }

      // Format the content with metadata
      const formattedContent = `# Rewritten Content\n\n${data.content}\n\n---\n\n**Rewrite Settings:**\n- Tone: ${tone}\n- Length: ${length}\n- Target Audience: ${targetAudience}\n- Original Length: ${data.metadata?.parameters?.originalLength || 0} characters\n- Rewritten Length: ${data.metadata?.parameters?.rewrittenLength || 0} characters\n\n**AI Model:**\n- Model: ${data.metadata?.model || 'GPT-3.5 Turbo'}\n- Temperature: ${data.metadata?.temperature || 0.7}`;

      setRewrittenContent(formattedContent);
      setIsGenerating(false);
    } catch (err: any) {
      console.error('Error rewriting content:', err);
      setError(err.message || 'Failed to rewrite content. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    alert("Content saved to My Content! (Mock functionality)");
  };

  const handleReset = () => {
    setContent("");
    setTone("professional");
    setLength("same");
    setTargetAudience("general");
    setRewrittenContent("");
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
                <RefreshCw className="h-6 w-6" />
                <h1 className="text-3xl font-bold tracking-tight">Content Rewriter</h1>
              </div>
            </div>
            <p className="text-muted-foreground ml-12">
              Transform your existing content with AI-powered rewriting
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

          {!isGenerating && !rewrittenContent ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Input */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Content</CardTitle>
                    <CardDescription>
                      Paste your content or select from your library
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContentInput
                      value={content}
                      onChange={setContent}
                      placeholder="Paste your content here or select from your library..."
                    />
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
                      lengthOptions={lengthOptions}
                      targetAudience={targetAudience}
                      setTargetAudience={setTargetAudience}
                      targetAudienceOptions={targetAudienceOptions}
                    />

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-4">
                      <Button
                        onClick={handleRewrite}
                        disabled={!content.trim()}
                        className="w-full"
                        size="lg"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Rewrite Content
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
                content={rewrittenContent}
                title="Rewritten Content"
                onSave={handleSave}
              />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Rewrite Another
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
