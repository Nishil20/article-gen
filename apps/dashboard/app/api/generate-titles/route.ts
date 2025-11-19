import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { openAIConfig, validateOpenAIConfig } from '@/lib/config/openai';

// Define request body type
interface GenerateTitlesRequest {
  description: string;
  language: string;
  creativity: string;
  targetedKeyword?: string;
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
    const body: GenerateTitlesRequest = await request.json();
    const { description, language, creativity, targetedKeyword } = body;

    // Validate required fields
    if (!description || !language || !creativity) {
      return NextResponse.json(
        { error: 'Missing required fields: description, language, and creativity are required' },
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
    const keywordText = targetedKeyword ? `\nTargeted Keyword: ${targetedKeyword}` : '';
    const temperature = creativityToTemperature[creativity as keyof typeof creativityToTemperature] || 0.7;

    const systemPrompt = `You are a professional blog title writer with expertise in creating engaging, SEO-friendly titles. Your titles should be attention-grabbing, clear, and optimized for search engines.`;

    const userPrompt = `Generate 4 diverse and compelling blog post titles based on the following description:

Description: "${description}"
Language: ${language}${keywordText}

Requirements:
1. Create 4 unique, varied titles with different approaches:
   - A "How-to" style title
   - A "Guide" style title
   - A "List" or numbered style title
   - A direct, benefit-focused title
2. Each title should be clear and specific
3. Titles should be SEO-friendly and include relevant keywords
4. Keep titles between 50-70 characters for optimal SEO
5. Make titles engaging and click-worthy
6. Ensure titles are grammatically correct

Return ONLY a JSON array of 4 title strings, nothing else. Format:
["Title 1", "Title 2", "Title 3", "Title 4"]`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: openAIConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: temperature,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    // Extract generated content
    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let titles: string[];
    try {
      const parsed = JSON.parse(generatedContent);
      // Handle both array and object responses
      titles = Array.isArray(parsed) ? parsed : (parsed.titles || Object.values(parsed));

      // Validate we got 4 titles
      if (!Array.isArray(titles) || titles.length !== 4) {
        // If parsing fails or we don't get exactly 4 titles, generate fallback titles
        titles = [
          `How to ${description}`,
          `The Ultimate Guide to ${description}`,
          `10 Tips for ${description}`,
          `${description}: Everything You Need to Know`
        ];
      }
    } catch (parseError) {
      console.error('Error parsing titles JSON:', parseError);
      // Fallback to simple title generation
      titles = [
        `How to ${description}`,
        `The Ultimate Guide to ${description}`,
        `10 Tips for ${description}`,
        `${description}: Everything You Need to Know`
      ];
    }

    // Return success response
    return NextResponse.json({
      success: true,
      titles: titles,
      metadata: {
        model: openAIConfig.model,
        temperature: temperature,
        usage: completion.usage,
        parameters: {
          description,
          language,
          creativity,
          targetedKeyword,
        },
      },
    });

  } catch (error: any) {
    console.error('Error generating titles:', error);

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
        error: 'Failed to generate titles',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
