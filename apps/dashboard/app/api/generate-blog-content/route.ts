import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { openAIConfig, validateOpenAIConfig } from '@/lib/config/openai';

// Define request body type
interface GenerateBlogContentRequest {
  title: string;
  intro: string;
  sections: string[];
  targetedKeyword?: string;
  language: string;
  creativity: string;
  targetLength?: string; // 'short' (800-1200), 'medium' (1500-2500), 'long' (3000-5000)
}

// Creativity to temperature mapping
const creativityToTemperature = {
  low: 0.5,
  regular: 0.7,
  high: 0.9,
};

// Length guidelines for content generation
const lengthGuide = {
  short: {
    total: '800-1200 words',
    perSection: '150-250 words per section',
  },
  medium: {
    total: '1500-2500 words',
    perSection: '300-500 words per section',
  },
  long: {
    total: '3000-5000 words',
    perSection: '600-1000 words per section',
  },
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: GenerateBlogContentRequest = await request.json();
    const { title, intro, sections, targetedKeyword, language, creativity, targetLength = 'short' } = body;

    // Validate required fields
    if (!title || !intro || !sections || !Array.isArray(sections) || sections.length === 0 || !language || !creativity) {
      return NextResponse.json(
        { error: 'Missing required fields: title, intro, sections (array), language, and creativity are required' },
        { status: 400 }
      );
    }

    // Validate OpenAI configuration
    try {
      validateOpenAIConfig();
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: openAIConfig.apiKey,
    });

    // Build the prompt
    const keywordText = targetedKeyword ? `\nTargeted Keyword: ${targetedKeyword} (use naturally throughout the content for SEO)` : '';
    const temperature = creativityToTemperature[creativity as keyof typeof creativityToTemperature] || 0.7;
    const lengthInfo = lengthGuide[targetLength as keyof typeof lengthGuide] || lengthGuide.short;

    const sectionsText = sections.map((section, index) => `${index + 1}. ${section}`).join('\n');

    const systemPrompt = `You are a professional blog writer with expertise in creating comprehensive, engaging, and SEO-optimized blog posts. Your content should be well-researched, informative, and provide real value to readers.`;

    const userPrompt = `Write a complete blog post with the following specifications:

Title: "${title}"

Introduction (already written):
${intro}

Main Sections to Cover:
${sectionsText}

Language: ${language}${keywordText}
Target Length: ${lengthInfo.total}
Content per section: ${lengthInfo.perSection}

Requirements:
1. Write comprehensive content for each of the ${sections.length} sections listed above
2. Each section should be a proper H2 heading (## in markdown)
3. Include relevant subheadings (H3 - ### in markdown) within sections as needed
4. Use bullet points and numbered lists where appropriate for better readability
5. Include practical examples, tips, or case studies where relevant
6. Maintain a conversational yet professional tone
7. Ensure smooth transitions between sections
8. Add a compelling conclusion that summarizes key points and includes a call-to-action
9. Optimize for SEO by naturally incorporating the targeted keyword if provided
10. Use markdown formatting for proper structure
11. Make content actionable and valuable for readers
12. Ensure the total word count is approximately ${lengthInfo.total}

Format the output in clean markdown with proper heading hierarchy:
- H1 (#) for the title
- H2 (##) for main sections
- H3 (###) for subsections
- Use **bold** for emphasis
- Use bullet points (-) and numbered lists (1.) where appropriate
- Use > for blockquotes if needed

Write ONLY the complete blog post content in markdown format. Start with the title as H1, then the introduction (don't add "Introduction" as a heading), then all sections with their content, and end with a conclusion section.`;

    // Call OpenAI API with higher token limit for full article
    const completion = await openai.chat.completions.create({
      model: openAIConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: temperature,
      max_tokens: openAIConfig.maxTokens.article || 4000,
    });

    // Extract generated content
    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    // Calculate approximate word count
    const wordCount = generatedContent.trim().split(/\s+/).length;

    // Return success response
    return NextResponse.json({
      success: true,
      content: generatedContent.trim(),
      wordCount: wordCount,
      metadata: {
        model: openAIConfig.model,
        temperature: temperature,
        usage: completion.usage,
        parameters: {
          title,
          sections,
          targetedKeyword,
          language,
          creativity,
          targetLength,
        },
      },
    });

  } catch (error: any) {
    console.error('Error generating blog content:', error);

    // Handle OpenAI specific errors
    if (error.response) {
      return NextResponse.json(
        {
          error: 'OpenAI API error',
          details: error.response.data?.error?.message || 'Unknown error'
        },
        { status: error.response.status }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'Failed to generate blog content',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
