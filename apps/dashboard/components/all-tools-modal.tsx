"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { mockTools } from "@/lib/mockData";

interface AllToolsModalProps {
  children: React.ReactNode;
}

export function AllToolsModal({ children }: AllToolsModalProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Group tools by category
  const toolsByCategory = mockTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof mockTools>);

  const handleToolClick = (toolId: string, toolTitle: string) => {
    // Close modal and navigate to the respective tool page
    setOpen(false);

    if (toolId === "old-article-generator") {
      router.push("/old-article-writer");
    } else if (toolId === "blog-post-writer") {
      router.push("/blog-post-writer");
    } else if (toolId === "article-generator") {
      router.push("/article-generator");
    } else if (toolId === "content-rewriter") {
      router.push("/content-rewriter");
    } else if (toolId === "paragraph-generator") {
      router.push("/paragraph-generator");
    } else {
      alert(`${toolTitle} coming soon!`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#171717]">
            All Tools
          </DialogTitle>
          <DialogDescription className="text-[#737373]">
            Explore all available AI-powered content creation tools
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {Object.entries(toolsByCategory).map(([category, tools]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-[#171717] mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <Card
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id, tool.title)}
                    className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-[#e5e5e5] hover:border-[#171717]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{tool.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-[#171717] mb-1">
                          {tool.title}
                        </h4>
                        <p className="text-sm text-[#737373]">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
