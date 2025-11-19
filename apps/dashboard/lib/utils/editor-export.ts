/**
 * Editor Export Utilities
 * Handle exporting editor content in various formats
 */

import TurndownService from 'turndown';

// Initialize Turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

/**
 * Convert HTML to Markdown
 */
export function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html);
}

/**
 * Convert HTML to plain text
 */
export function htmlToPlainText(html: string): string {
  // Create a temporary element to parse HTML
  if (typeof window !== 'undefined') {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }

  // Fallback for server-side: strip HTML tags
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Download content as a file
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export content as Markdown file
 */
export function exportAsMarkdown(html: string, title: string, metadata?: {
  keywords?: string;
  language?: string;
  wordCount?: number;
  author?: string;
}) {
  const markdown = htmlToMarkdown(html);
  const date = new Date().toISOString().split('T')[0];

  // Add frontmatter if metadata provided
  let content = '';
  if (metadata) {
    content += '---\n';
    content += `title: ${title}\n`;
    content += `date: ${date}\n`;
    if (metadata.keywords) content += `keywords: ${metadata.keywords}\n`;
    if (metadata.language) content += `language: ${metadata.language}\n`;
    if (metadata.wordCount) content += `word_count: ${metadata.wordCount}\n`;
    if (metadata.author) content += `author: ${metadata.author}\n`;
    content += '---\n\n';
  }

  content += `# ${title}\n\n${markdown}`;

  const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
  downloadFile(content, filename, 'text/markdown');
}

/**
 * Export content as HTML file
 */
export function exportAsHtml(html: string, title: string) {
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1 { font-size: 2.5em; margin-bottom: 0.5em; }
        h2 { font-size: 2em; margin-top: 1.5em; margin-bottom: 0.5em; }
        h3 { font-size: 1.5em; margin-top: 1.2em; margin-bottom: 0.5em; }
        p { margin-bottom: 1em; }
        ul, ol { margin-bottom: 1em; padding-left: 2em; }
        li { margin-bottom: 0.5em; }
        blockquote {
            border-left: 4px solid #ddd;
            padding-left: 1em;
            margin-left: 0;
            color: #666;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 1em;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
            font-weight: bold;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>${title}</h1>
    ${html}
</body>
</html>`;

  const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
  downloadFile(fullHtml, filename, 'text/html');
}

/**
 * Export content as plain text file
 */
export function exportAsText(html: string, title: string) {
  const plainText = htmlToPlainText(html);
  const content = `${title}\n${'='.repeat(title.length)}\n\n${plainText}`;

  const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
  downloadFile(content, filename, 'text/plain');
}

/**
 * Copy content to clipboard
 */
export async function copyToClipboard(html: string, format: 'html' | 'markdown' | 'text' = 'text'): Promise<boolean> {
  try {
    let content: string;

    switch (format) {
      case 'html':
        content = html;
        break;
      case 'markdown':
        content = htmlToMarkdown(html);
        break;
      case 'text':
      default:
        content = htmlToPlainText(html);
        break;
    }

    await navigator.clipboard.writeText(content);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Calculate word count from HTML
 */
export function getHtmlWordCount(html: string): number {
  const plainText = htmlToPlainText(html);
  return plainText.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Calculate character count from HTML (excluding HTML tags)
 */
export function getHtmlCharCount(html: string): number {
  const plainText = htmlToPlainText(html);
  return plainText.length;
}

/**
 * Estimate reading time in minutes
 */
export function getReadingTime(html: string): number {
  const wordCount = getHtmlWordCount(html);
  return Math.ceil(wordCount / 200);
}
