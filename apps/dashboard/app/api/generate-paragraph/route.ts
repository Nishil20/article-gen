import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { openAIConfig, validateOpenAIConfig } from '@/lib/config/openai';

// Define request body type
interface GenerateParagraphRequest {
  topic: string;
  keywords?: string;
  tone: string;
  length: string;
  targetAudience: string;
  paragraphCount: number;
}

// Length mapping for better prompts
const lengthGuide = {
  short: '50-100 words per paragraph',
  medium: '100-150 words per paragraph',
  long: '150-250 words per paragraph',
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: GenerateParagraphRequest = await request.json();
    const { topic, keywords, tone, length, targetAudience, paragraphCount } = body;

    // Validate required fields
    if (!topic || !tone || !length || !targetAudience || !paragraphCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    const keywordsText = keywords ? `\nKeywords to include: ${keywords}` : '';
    const lengthGuideText = lengthGuide[length as keyof typeof lengthGuide] || lengthGuide.medium;

    const systemPrompt = `You are a professional content writer. Your task is to generate high-quality, well-structured paragraphs based on the provided specifications. Ensure the content is engaging, informative, and tailored to the target audience.`;

    const userPrompt = `Generate ${paragraphCount} ${tone} paragraph${paragraphCount > 1 ? 's' : ''} about: "${topic}"

Specifications:
- Tone: ${tone}
- Length: ${lengthGuideText}
- Target Audience: ${targetAudience}${keywordsText}

Requirements:
1. Write ${paragraphCount} distinct paragraph${paragraphCount > 1 ? 's' : ''} that flow naturally
2. Each paragraph should be cohesive and well-structured
3. Use appropriate vocabulary for a ${targetAudience} audience
4. Maintain a ${tone} tone throughout
5. If multiple paragraphs, ensure smooth transitions between them
6. Make the content engaging and informative

Format the output as separate paragraphs with clear line breaks between them.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: openAIConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: openAIConfig.temperature,
      max_tokens: openAIConfig.maxTokens.paragraph,
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
      content: generatedContent,
      metadata: {
        model: openAIConfig.model,
        temperature: openAIConfig.temperature,
        usage: completion.usage,
        parameters: {
          topic,
          keywords,
          tone,
          length,
          targetAudience,
          paragraphCount,
        },
      },
    });

  } catch (error: any) {
    console.error('Error generating paragraph:', error);

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
        error: 'Failed to generate content',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
