import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { openAIConfig, validateOpenAIConfig } from '@/lib/config/openai';

// Define request body type
interface GenerateOutlineRequest {
  title: string;
  intro: string;
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
    const body: GenerateOutlineRequest = await request.json();
    const { title, intro, targetedKeyword, language, creativity } = body;

    // Validate required fields
    if (!title || !intro || !language || !creativity) {
      return NextResponse.json(
        { error: 'Missing required fields: title, intro, language, and creativity are required' },
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

    const systemPrompt = `You are a professional content strategist with expertise in creating logical, well-structured blog post outlines. Your outlines should be comprehensive, flow naturally, and cover all key aspects of the topic.`;

    const userPrompt = `Create a logical outline with 4 main section titles for a blog post with the following details:

Title: "${title}"
Introduction: "${intro}"
Language: ${language}${keywordText}

Requirements:
1. Generate exactly 4 section titles (H2 headings)
2. Sections should flow logically and build upon each other
3. Cover the topic comprehensively
4. Each section title should be clear, specific, and actionable
5. Ensure proper progression from basics to advanced concepts
6. Make section titles engaging and descriptive (5-8 words each)
7. Avoid generic titles like "Introduction" or "Conclusion"
8. Consider including:
   - Understanding/fundamentals section
   - Practical tips/strategies section
   - Common pitfalls/mistakes section
   - Advanced techniques/future trends section

Return ONLY a JSON array of 4 section title strings, nothing else. Format:
["Section Title 1", "Section Title 2", "Section Title 3", "Section Title 4"]`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: openAIConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: temperature,
      max_tokens: 400,
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
    let sections: string[];
    try {
      const parsed = JSON.parse(generatedContent);
      // Handle both array and object responses
      sections = Array.isArray(parsed) ? parsed : (parsed.sections || Object.values(parsed));

      // Validate we got 4 sections
      if (!Array.isArray(sections) || sections.length !== 4) {
        // If parsing fails or we don't get exactly 4 sections, generate fallback sections
        sections = [
          "Understanding the Fundamentals",
          "Best Practices and Strategies",
          "Common Mistakes to Avoid",
          "Advanced Techniques and Tips"
        ];
      }
    } catch (parseError) {
      console.error('Error parsing outline JSON:', parseError);
      // Fallback to default sections
      sections = [
        "Understanding the Fundamentals",
        "Best Practices and Strategies",
        "Common Mistakes to Avoid",
        "Advanced Techniques and Tips"
      ];
    }

    // Return success response
    return NextResponse.json({
      success: true,
      sections: sections,
      metadata: {
        model: openAIConfig.model,
        temperature: temperature,
        usage: completion.usage,
        parameters: {
          title,
          intro,
          targetedKeyword,
          language,
          creativity,
        },
      },
    });

  } catch (error: any) {
    console.error('Error generating outline:', error);

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
        error: 'Failed to generate outline',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
