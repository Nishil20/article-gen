"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { MetricCard } from "@/components/metric-card";
import { ToolCard } from "@/components/tool-card";
import { ContentCard } from "@/components/content-card";
import { PromotionalBanner } from "@/components/promotional-banner";
import { FloatingChatButton } from "@/components/floating-chat-button";
import { Button } from "@/components/ui/button";
import {
  mockUser,
  mockMetrics,
  mockTools,
  mockRecentContent,
} from "@/lib/mockData";

export default function DashboardPage() {
  const router = useRouter();

  const handleToolClick = (toolId: string, toolTitle: string) => {
    // Special handling for Article Generator - navigate to article writer
    if (toolId === "article-generator") {
      router.push("/article-writer");
    } else {
      alert(`${toolTitle} coming soon!`);
    }
  };

  const handleContentAction = (action: string, contentTitle: string) => {
    alert(`${action} "${contentTitle}" - Feature coming soon!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="px-6 md:px-12 py-8 md:py-12 max-w-[1400px] mx-auto">
          {/* Header with Greeting */}
          <div className="mb-12">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#171717] leading-[1.1] tracking-[-0.02em] mb-2 font-satoshi">
              Hey {mockUser.name} — Let&apos;s boost your website traffic today!
            </h1>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mockMetrics.map((metric) => (
              <MetricCard
                key={metric.id}
                label={metric.label}
                value={metric.value}
                icon={metric.icon}
              />
            ))}
          </div>

          {/* Most Popular Tools Section */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#171717] mb-2 font-satoshi">
                Most Popular Tools
              </h2>
              <p className="text-base text-[#737373] leading-[1.6]">
                These are the most popular tools and a good place to start. Give
                them a try!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  category={tool.category}
                  onClick={() => handleToolClick(tool.id, tool.title)}
                />
              ))}
            </div>
          </section>

          {/* Promotional Banner */}
          <section className="mb-12">
            <PromotionalBanner />
          </section>

          {/* Recent Content Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#171717] mb-2 font-satoshi">
                  Recent Content
                </h2>
                <p className="text-base text-[#737373] leading-[1.6]">
                  Your recently generated articles and content
                </p>
              </div>
              <Button variant="outline">View All</Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockRecentContent.map((content) => (
                <ContentCard
                  key={content.id}
                  title={content.title}
                  thumbnail={content.thumbnail}
                  date={content.date}
                  wordCount={content.wordCount}
                  status={content.status}
                  onView={() => handleContentAction("View", content.title)}
                  onEdit={() => handleContentAction("Edit", content.title)}
                  onDelete={() => handleContentAction("Delete", content.title)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
}
