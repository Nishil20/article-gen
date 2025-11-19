import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { openAIConfig, validateOpenAIConfig } from '@/lib/config/openai';

// Define request body type
interface RewriteContentRequest {
  content: string;
  tone: string;
  length: string;
  targetAudience: string;
}

// Length instruction mapping
const lengthInstructions = {
  shorter: 'Condense the content by approximately 30% while retaining all key information',
  same: 'Maintain approximately the same length as the original content',
  longer: 'Expand the content by approximately 50% with additional details, examples, and elaboration',
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RewriteContentRequest = await request.json();
    const { content, tone, length, targetAudience } = body;

    // Validate required fields
    if (!content || !tone || !length || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.trim().length < 10) {
      return NextResponse.json(
        { error: 'Content is too short. Please provide at least 10 characters.' },
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
    const lengthInstruction = lengthInstructions[length as keyof typeof lengthInstructions] || lengthInstructions.same;

    const systemPrompt = `You are an expert content writer and editor. Your task is to rewrite content according to specific requirements while preserving the original meaning and key points. Ensure the rewritten content is high-quality, engaging, and tailored to the target audience.`;

    const userPrompt = `Rewrite the following content with these specifications:

**Original Content:**
${content}

**Requirements:**
1. Tone: ${tone}
2. Length: ${lengthInstruction}
3. Target Audience: ${targetAudience}
4. Maintain the core message and key points from the original
5. Improve clarity, flow, and readability
6. Use appropriate vocabulary for a ${targetAudience} audience
7. Apply a ${tone} tone throughout
8. Ensure the content is engaging and well-structured

Please provide only the rewritten content without any preamble, explanations, or meta-commentary.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: openAIConfig.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: openAIConfig.temperature,
      max_tokens: openAIConfig.maxTokens.rewrite,
    });

    // Extract generated content
    const rewrittenContent = completion.choices[0]?.message?.content;

    if (!rewrittenContent) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      content: rewrittenContent,
      metadata: {
        model: openAIConfig.model,
        temperature: openAIConfig.temperature,
        usage: completion.usage,
        parameters: {
          tone,
          length,
          targetAudience,
          originalLength: content.length,
          rewrittenLength: rewrittenContent.length,
        },
      },
    });

  } catch (error: any) {
    console.error('Error rewriting content:', error);

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
        error: 'Failed to rewrite content',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
