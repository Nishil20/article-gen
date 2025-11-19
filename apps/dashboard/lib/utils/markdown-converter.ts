/**
 * Markdown to HTML Converter
 * Converts markdown content to HTML format for Tiptap editor
 */

/**
 * Convert markdown to HTML
 * This is a simple converter for basic markdown syntax
 * For production, consider using a library like marked or remark
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/\_\_\_(.*?)\_\_\_/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
  html = html.replace(/\_(.*?)\_/g, '<em>$1</em>');

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Convert horizontal rules
  html = html.replace(/^\-\-\-$/gim, '<hr>');
  html = html.replace(/^\*\*\*$/gim, '<hr>');

  // Convert unordered lists
  html = html.replace(/^\* (.+)/gim, '<li>$1</li>');
  html = html.replace(/^- (.+)/gim, '<li>$1</li>');

  // Wrap consecutive list items in ul
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    return `<ul>${match}</ul>`;
  });

  // Convert ordered lists
  html = html.replace(/^\d+\. (.+)/gim, '<li>$1</li>');

  // Wrap consecutive numbered list items in ol
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    // Check if this is after already wrapped in ul
    if (!match.includes('<ul>')) {
      return `<ol>${match}</ol>`;
    }
    return match;
  });

  // Convert paragraphs (double line breaks)
  html = html.split('\n\n').map(paragraph => {
    paragraph = paragraph.trim();
    // Don't wrap if already an HTML element
    if (paragraph.startsWith('<h') ||
        paragraph.startsWith('<ul') ||
        paragraph.startsWith('<ol') ||
        paragraph.startsWith('<blockquote') ||
        paragraph.startsWith('<hr') ||
        paragraph === '') {
      return paragraph;
    }
    return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}

/**
 * Strip markdown formatting to get plain text
 */
export function markdownToPlainText(markdown: string): string {
  let text = markdown;

  // Remove headers
  text = text.replace(/^#{1,6}\s+/gim, '');

  // Remove bold and italic
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, '$1');
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/\_\_\_(.*?)\_\_\_/g, '$1');
  text = text.replace(/\_\_(.*?)\_\_/g, '$1');
  text = text.replace(/\_(.*?)\_/g, '$1');

  // Remove links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');

  // Remove inline code
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove blockquote markers
  text = text.replace(/^> /gim, '');

  // Remove horizontal rules
  text = text.replace(/^\-\-\-$/gim, '');
  text = text.replace(/^\*\*\*$/gim, '');

  // Remove list markers
  text = text.replace(/^\* /gim, '');
  text = text.replace(/^- /gim, '');
  text = text.replace(/^\d+\. /gim, '');

  return text.trim();
}

/**
 * Calculate word count from markdown
 */
export function getWordCount(text: string): number {
  // Remove markdown formatting first
  const plainText = markdownToPlainText(text);
  // Count words
  return plainText.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Estimate reading time in minutes
 * Average reading speed: 200 words per minute
 */
export function getReadingTime(text: string): number {
  const wordCount = getWordCount(text);
  return Math.ceil(wordCount / 200);
}
