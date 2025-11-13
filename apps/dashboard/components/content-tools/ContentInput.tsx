"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockArticles, type Article } from "@/lib/mockData/myContent";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ContentInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ContentInput({ value, onChange, placeholder }: ContentInputProps) {
  const [selectedArticle, setSelectedArticle] = useState<string>("");

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article.id);
    onChange(article.content);
  };

  return (
    <Tabs defaultValue="paste" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="paste">Paste Text</TabsTrigger>
        <TabsTrigger value="library">Select from Library</TabsTrigger>
      </TabsList>

      <TabsContent value="paste" className="mt-4">
        <div className="space-y-2">
          <Label htmlFor="content-input">Your Content</Label>
          <textarea
            id="content-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Paste or type your content here..."}
            className="w-full h-64 px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <p className="text-xs text-muted-foreground">{value.length} characters</p>
        </div>
      </TabsContent>

      <TabsContent value="library" className="mt-4">
        <div className="space-y-2">
          <Label>Select Content to Rewrite</Label>
          <div className="max-h-96 overflow-y-auto space-y-2 border rounded-md p-2">
            {mockArticles.slice(0, 10).map((article) => (
              <Card
                key={article.id}
                onClick={() => handleArticleSelect(article)}
                className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                  selectedArticle === article.id ? "bg-accent border-primary" : ""
                }`}
              >
                <div className="space-y-2">
                  <h4 className="text-sm font-medium leading-none line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant={article.status === "published" ? "success" : "default"} className="text-xs">
                      {article.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.wordCount} words
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
