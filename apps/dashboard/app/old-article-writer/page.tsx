import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/sidebar";

export default function ArticleWriterHub() {
  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
      {/* Header */}
      <div className="border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/"
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
            <h1 className="text-3xl md:text-4xl font-bold text-[#171717] font-satoshi tracking-[-0.02em]">
              AI Article Writer
            </h1>
          </div>
          <p className="text-base text-[#737373] leading-[1.6] max-w-[600px]">
            Choose your preferred workflow to generate SEO-optimized articles
            with AI. Pick the quick option for speed, or use the complete
            workflow for maximum control.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Workflow */}
          <Card className="hover:shadow-active transition-all duration-200 flex flex-col">
            <CardContent className="p-8 flex flex-col flex-1">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">⚡</div>
                  <Badge variant="success" className="text-xs">
                    Recommended
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-[#171717] mb-2 font-satoshi">
                  Quick Start
                </h2>
                <p className="text-sm text-[#737373] leading-[1.6] mb-4">
                  Generate articles in 3 simple steps. Perfect for fast content
                  creation.
                </p>
              </div>

              <div className="mb-6 space-y-3 flex-1">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm text-[#404040]">Enter your topic</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm text-[#404040]">AI generates article</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm text-[#404040]">
                    Preview and export
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#737373]">
                  <span>⏱️ Time</span>
                  <span className="font-medium">~2 minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#737373]">
                  <span>🎯 Complexity</span>
                  <span className="font-medium">Simple</span>
                </div>
              </div>

              <Link href="/old-article-writer/quick" className="mt-6">
                <Button className="w-full">Start Quick Workflow</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Standard Workflow */}
          <Card className="hover:shadow-active transition-all duration-200 flex flex-col">
            <CardContent className="p-8 flex flex-col flex-1">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">🎯</div>
                  <Badge variant="default" className="text-xs">
                    Popular
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-[#171717] mb-2 font-satoshi">
                  Standard
                </h2>
                <p className="text-sm text-[#737373] leading-[1.6] mb-4">
                  Balanced workflow with SEO optimization and quality control.
                </p>
              </div>

              <div className="mb-6 space-y-3 flex-1">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm text-[#404040]">
                    Topic & keywords
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm text-[#404040]">Generate draft</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm text-[#404040]">SEO optimization</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <p className="text-sm text-[#404040]">Meta tags</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">5</span>
                  </div>
                  <p className="text-sm text-[#404040]">Preview & export</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#737373]">
                  <span>⏱️ Time</span>
                  <span className="font-medium">~5 minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#737373]">
                  <span>🎯 Complexity</span>
                  <span className="font-medium">Medium</span>
                </div>
              </div>

              <Link href="/old-article-writer/standard" className="mt-6">
                <Button variant="outline" className="w-full">
                  Start Standard Workflow
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Complete Workflow */}
          <Card className="hover:shadow-active transition-all duration-200 flex flex-col">
            <CardContent className="p-8 flex flex-col flex-1">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">🚀</div>
                  <Badge variant="outline" className="text-xs">
                    Advanced
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-[#171717] mb-2 font-satoshi">
                  Complete
                </h2>
                <p className="text-sm text-[#737373] leading-[1.6] mb-4">
                  Full professional workflow with all SEO features and publishing
                  options.
                </p>
              </div>

              <div className="mb-6 space-y-2 flex-1">
                <p className="text-xs text-[#737373] font-medium mb-2">
                  9-step comprehensive workflow:
                </p>
                <ul className="text-xs text-[#404040] space-y-1 ml-4">
                  <li>• Keyword research</li>
                  <li>• Content brief</li>
                  <li>• Outline expansion</li>
                  <li>• Draft generation</li>
                  <li>• SEO optimization</li>
                  <li>• Meta tags & schema</li>
                  <li>• Image generation</li>
                  <li>• Publishing setup</li>
                  <li>• Results & tracking</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#737373]">
                  <span>⏱️ Time</span>
                  <span className="font-medium">~10-15 minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#737373]">
                  <span>🎯 Complexity</span>
                  <span className="font-medium">Advanced</span>
                </div>
              </div>

              <Link href="/old-article-writer/complete" className="mt-6">
                <Button variant="outline" className="w-full">
                  Start Complete Workflow
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-[#fafafa] border border-[#e5e5e5] rounded-xl">
          <div className="flex items-start gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="text-base font-semibold text-[#171717] mb-2 font-inter">
                Not sure which to choose?
              </h3>
              <p className="text-sm text-[#737373] leading-[1.6] mb-3">
                Start with the <strong>Quick Workflow</strong> if you need content fast.
                Use <strong>Standard</strong> for balanced SEO optimization.
                Choose <strong>Complete</strong> when you need full control over every aspect
                of your article.
              </p>
              <p className="text-xs text-[#a3a3a3]">
                All workflows use the same powerful AI model and generate
                high-quality, SEO-optimized content.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
