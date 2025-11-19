"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useEffect, useState, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Palette,
  Highlighter,
  Download,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  exportAsMarkdown,
  exportAsHtml,
  exportAsText,
  copyToClipboard,
  getHtmlWordCount,
  getReadingTime,
} from "@/lib/utils/editor-export";

interface EnhancedEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  title?: string;
  metadata?: {
    keywords?: string;
    language?: string;
    author?: string;
  };
  onSave?: () => void;
  onBack?: () => void;
}

export function EnhancedEditor({
  content,
  onChange,
  placeholder = "Start writing your article...",
  title = "Untitled Article",
  metadata,
  onSave,
  onBack,
}: EnhancedEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[500px] max-w-none p-6",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleAddLink = useCallback(() => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkDialog(false);
    }
  }, [editor, linkUrl]);

  const handleAddImage = useCallback(() => {
    if (imageUrl) {
      editor?.commands.setImage({ src: imageUrl });
      setImageUrl("");
      setShowImageDialog(false);
    }
  }, [editor, imageUrl]);

  const handleCopy = async () => {
    if (editor) {
      const success = await copyToClipboard(editor.getHTML(), "markdown");
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleExportMarkdown = () => {
    if (editor) {
      exportAsMarkdown(editor.getHTML(), title, {
        ...metadata,
        wordCount: getHtmlWordCount(editor.getHTML()),
      });
    }
  };

  const handleExportHtml = () => {
    if (editor) {
      exportAsHtml(editor.getHTML(), title);
    }
  };

  const handleExportText = () => {
    if (editor) {
      exportAsText(editor.getHTML(), title);
    }
  };

  if (!editor) {
    return null;
  }

  const wordCount = getHtmlWordCount(editor.getHTML());
  const readingTime = getReadingTime(editor.getHTML());

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
    disabled,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
        isActive
          ? "bg-[#171717] text-white"
          : "bg-white text-[#404040] hover:bg-[#f5f5f5] border border-[#e5e5e5]"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="flex items-center justify-between text-sm text-[#737373]">
        <div className="flex gap-4">
          <span>{wordCount} words</span>
          <span>{readingTime} min read</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-[#737373] hover:text-[#171717]"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="bg-white rounded-xl border border-[#e5e5e5]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 p-4 border-b border-[#e5e5e5]">
          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-[#e5e5e5]" />

          {/* Headings */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-[#e5e5e5]" />

          {/* Lists & Quote */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-[#e5e5e5]" />

          {/* Alignment */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().setTextAlign("left").run()
            }
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().setTextAlign("center").run()
            }
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().setTextAlign("right").run()
            }
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().setTextAlign("justify").run()
            }
            isActive={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-[#e5e5e5]" />

          {/* Insert Elements */}
          <ToolbarButton
            onClick={() => setShowLinkDialog(true)}
            isActive={editor.isActive("link")}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => setShowImageDialog(true)}
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Line"
          >
            <Minus className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-[#e5e5e5]" />

          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Editor Content */}
        <div className="tiptap-editor">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#171717] mb-4">
              Insert Link
            </h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-[#e5e5e5] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#171717]"
              onKeyPress={(e) => e.key === "Enter" && handleAddLink()}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddLink} disabled={!linkUrl}>
                Insert
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#171717] mb-4">
              Insert Image
            </h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-[#e5e5e5] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#171717]"
              onKeyPress={(e) => e.key === "Enter" && handleAddImage()}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowImageDialog(false);
                  setImageUrl("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddImage} disabled={!imageUrl}>
                Insert
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
        <div className="flex gap-2">
          {onBack && (
            <Button variant="ghost" onClick={onBack}>
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportMarkdown}
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            .md
          </Button>
          <Button
            variant="outline"
            onClick={handleExportHtml}
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            .html
          </Button>
          <Button
            variant="outline"
            onClick={handleExportText}
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            .txt
          </Button>
          {onSave && (
            <Button onClick={onSave}>
              Save
            </Button>
          )}
        </div>
      </div>

      <style jsx global>{`
        .tiptap-editor .ProseMirror {
          outline: none;
        }

        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: #a3a3a3;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .tiptap-editor .ProseMirror h1 {
          font-size: 2em;
          font-weight: 700;
          margin-top: 1em;
          margin-bottom: 0.5em;
          line-height: 1.2;
          color: #171717;
        }

        .tiptap-editor .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 700;
          margin-top: 1em;
          margin-bottom: 0.5em;
          line-height: 1.3;
          color: #171717;
        }

        .tiptap-editor .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin-top: 1em;
          margin-bottom: 0.5em;
          line-height: 1.4;
          color: #171717;
        }

        .tiptap-editor .ProseMirror p {
          margin-bottom: 1em;
          color: #404040;
          line-height: 1.6;
        }

        .tiptap-editor .ProseMirror ul,
        .tiptap-editor .ProseMirror ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }

        .tiptap-editor .ProseMirror li {
          margin-bottom: 0.5em;
          color: #404040;
        }

        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid #e5e5e5;
          padding-left: 1em;
          margin-left: 0;
          margin-bottom: 1em;
          color: #737373;
          font-style: italic;
        }

        .tiptap-editor .ProseMirror strong {
          font-weight: 700;
          color: #171717;
        }

        .tiptap-editor .ProseMirror em {
          font-style: italic;
        }

        .tiptap-editor .ProseMirror u {
          text-decoration: underline;
        }

        .tiptap-editor .ProseMirror code {
          background-color: #f5f5f5;
          border-radius: 4px;
          padding: 0.2em 0.4em;
          font-family: monospace;
          font-size: 0.9em;
        }

        .tiptap-editor .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e5e5;
          margin: 2em 0;
        }

        .tiptap-editor .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1em 0;
          overflow: hidden;
        }

        .tiptap-editor .ProseMirror td,
        .tiptap-editor .ProseMirror th {
          min-width: 1em;
          border: 2px solid #e5e5e5;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }

        .tiptap-editor .ProseMirror th {
          font-weight: 700;
          text-align: left;
          background-color: #f5f5f5;
        }

        .tiptap-editor .ProseMirror .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }

        .tiptap-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em 0;
        }

        .tiptap-editor .ProseMirror a {
          color: #0066cc;
          text-decoration: none;
          cursor: pointer;
        }

        .tiptap-editor .ProseMirror a:hover {
          text-decoration: underline;
        }

        .tiptap-editor .ProseMirror mark {
          background-color: #fef08a;
          padding: 0.1em 0.2em;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
