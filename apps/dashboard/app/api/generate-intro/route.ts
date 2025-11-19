import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { openAIConfig, validateOpenAIConfig } from '@/lib/config/openai';

// Define request body type
interface GenerateIntroRequest {
  title: string;
  description: string;
  targetedKeyword?: string;
  language: string;
  creativity: string;
}

// Creativity to temperature mapping
const creativityToTemperature = {
  low: 0.5,
  regular: 0.7,
  high: 0.9,
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: GenerateIntroRequest = await request.json();
    const { title, description, targetedKeyword, language, creativity } = body;

    // Validate required fields
    if (!title || !description || !language || !creativity) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, language, and creativity are required' },
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
    const keywordText = targetedKeyword ? `\nTargeted Keyword: ${targetedKeyword} (use this naturally in the introduction)` : '';
    const temperature = creativityToTemperature[creativity as keyof typeof creativityToTemperature] || 0.7;

    const systemPrompt = `You are a professional blog writer with expertise in crafting engaging introductions. Your introductions should hook the reader, establish context, and clearly communicate what the article will cover.`;

    const userPrompt = `Write an engaging introduction for a blog post with the following details:

Title: "${title}"
Description: "${description}"
Language: ${language}${keywordText}

Requirements:
1. Write 2-3 paragraphs (150-250 words total)
2. Start with a hook that grabs attention (question, statistic, bold statement, or relatable scenario)
3. Establish context and relevance to the reader
4. Clearly explain what the article will cover
5. Set expectations for what readers will learn
6. Use a conversational yet professional tone
7. Include the targeted keyword naturally if provided
8. End with a smooth transition to the main content
9. Make it engaging and encourage readers to continue

Write ONLY the introduction text, no formatting like "Introduction:" or similar labels.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: openAIConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: temperature,
      max_tokens: 600,
    });

    // Extract generated content
    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      intro: generatedContent.trim(),
      metadata: {
        model: openAIConfig.model,
        temperature: temperature,
        usage: completion.usage,
        parameters: {
          title,
          description,
          targetedKeyword,
          language,
          creativity,
        },
      },
    });

  } catch (error: any) {
    console.error('Error generating intro:', error);

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
        error: 'Failed to generate introduction',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
