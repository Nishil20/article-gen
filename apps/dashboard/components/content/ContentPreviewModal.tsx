"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArticleEditor } from "@/components/article-writer/ArticleEditor";
import type { Article } from "@/lib/mockData/myContent";

interface ContentPreviewModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContentPreviewModal({
  article,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ContentPreviewModalProps) {
  if (!isOpen || !article) return null;

  const handleSave = () => {
    alert("Article saved! (Mock functionality)");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
          <div
            className="bg-white rounded-xl shadow-active w-full max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#e5e5e5] flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-[#171717] font-satoshi truncate">
                    {article.title}
                  </h2>
                  <Badge variant={article.status === "published" ? "success" : "outline"}>
                    {article.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#737373]">
                  <span>{article.wordCount.toLocaleString()} words</span>
                  <span>•</span>
                  <span>{article.readingTime} min read</span>
                  {article.seoScore && (
                    <>
                      <span>•</span>
                      <span className="text-[#10b981] font-medium">
                        SEO Score: {article.seoScore}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[#737373]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <ArticleEditor
                content={article.content}
                title={article.title}
                onSave={handleSave}
                className="border-0 shadow-none"
              />
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#e5e5e5] flex gap-3">
              <Button variant="ghost" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onEdit();
                  onClose();
                }}
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Article
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="text-[#ff6b35] border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
