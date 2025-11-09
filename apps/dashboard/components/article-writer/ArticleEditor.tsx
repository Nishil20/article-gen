"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ArticleEditorProps {
  content: string;
  title?: string;
  onSave?: () => void;
  className?: string;
  readOnly?: boolean;
}

export function ArticleEditor({
  content,
  title = "Generated Article",
  onSave,
  className,
  readOnly = true,
}: ArticleEditorProps) {
  const [showExportMenu, setShowExportMenu] = React.useState(false);
  const editorRef = React.useRef<HTMLDivElement>(null);

  // Calculate stats
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Article copied to clipboard!");
    setShowExportMenu(false);
  };

  const handleDownload = (format: "md" | "html" | "txt") => {
    let fileContent = content;
    let mimeType = "text/plain";
    let extension = "txt";

    if (format === "md") {
      mimeType = "text/markdown";
      extension = "md";
    } else if (format === "html") {
      // Convert markdown to basic HTML
      fileContent = content
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
        .replace(/\*(.*)\*/gim, "<em>$1</em>")
        .replace(/\n\n/g, "</p><p>")
        .replace(/^(?!<h|<p)(.+)$/gim, "<p>$1</p>");
      fileContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    h1 { font-size: 2em; margin-bottom: 0.5em; }
    h2 { font-size: 1.5em; margin-top: 1.5em; margin-bottom: 0.5em; }
    h3 { font-size: 1.2em; margin-top: 1em; margin-bottom: 0.5em; }
  </style>
</head>
<body>
  ${fileContent}
</body>
</html>`;
      mimeType = "text/html";
      extension = "html";
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  // Render markdown as formatted text
  const renderContent = () => {
    return content.split("\n").map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-3xl md:text-4xl font-bold text-[#171717] mb-4 mt-8 font-satoshi tracking-[-0.02em]"
          >
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold text-[#171717] mb-3 mt-6 font-satoshi"
          >
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl md:text-2xl font-semibold text-[#171717] mb-2 mt-4 font-inter"
          >
            {line.substring(4)}
          </h3>
        );
      }

      // Lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={index} className="ml-6 mb-2 text-[#404040] leading-[1.7]">
            {line.substring(2)}
          </li>
        );
      }

      if (line.match(/^\d+\. /)) {
        return (
          <li key={index} className="ml-6 mb-2 text-[#404040] leading-[1.7]">
            {line.replace(/^\d+\. /, "")}
          </li>
        );
      }

      // Empty lines
      if (line.trim() === "") {
        return <div key={index} className="h-4" />;
      }

      // Regular paragraphs
      // Handle bold and italic
      const processedLine = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

      return (
        <p
          key={index}
          className="text-base text-[#404040] leading-[1.7] mb-4"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="border-b border-[#e5e5e5] px-6 py-4 bg-[#fafafa]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#171717] font-inter">
              {title}
            </h3>
            <div className="flex items-center gap-4 mt-1 text-xs text-[#737373]">
              <span>{wordCount.toLocaleString()} words</span>
              <span>•</span>
              <span>{readingTime} min read</span>
              {readOnly && (
                <>
                  <span>•</span>
                  <span className="text-[#10b981]">Ready to export</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Export Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportMenu(!showExportMenu)}
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export
              </Button>

              {/* Export Dropdown */}
              {showExportMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowExportMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e5e5e5] rounded-lg shadow-active z-20">
                    <div className="py-1">
                      <button
                        onClick={handleCopy}
                        className="w-full px-4 py-2 text-sm text-left text-[#404040] hover:bg-[#f5f5f5] transition-colors"
                      >
                        📋 Copy to Clipboard
                      </button>
                      <button
                        onClick={() => handleDownload("md")}
                        className="w-full px-4 py-2 text-sm text-left text-[#404040] hover:bg-[#f5f5f5] transition-colors"
                      >
                        📄 Download Markdown
                      </button>
                      <button
                        onClick={() => handleDownload("html")}
                        className="w-full px-4 py-2 text-sm text-left text-[#404040] hover:bg-[#f5f5f5] transition-colors"
                      >
                        🌐 Download HTML
                      </button>
                      <button
                        onClick={() => handleDownload("txt")}
                        className="w-full px-4 py-2 text-sm text-left text-[#404040] hover:bg-[#f5f5f5] transition-colors"
                      >
                        📝 Download Text
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Save Button */}
            {onSave && (
              <Button size="sm" onClick={onSave}>
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
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Save to My Content
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div
        ref={editorRef}
        className="px-6 md:px-12 py-8 max-w-[800px] mx-auto overflow-y-auto max-h-[600px]"
      >
        {renderContent()}
      </div>
    </Card>
  );
}
