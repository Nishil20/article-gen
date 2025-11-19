# OpenAI Configuration Guide

This document explains how to configure OpenAI settings for the content generation tools.

## Configuration File

All OpenAI-related settings are centralized in:
```
/lib/config/openai.ts
```

This ensures consistency across all API routes and makes it easy to update settings from one place.

## Environment Variables

### Required

- **`OPENAI_API_KEY`** (required)
  - Your OpenAI API key
  - Get it from: https://platform.openai.com/api-keys
  - Example: `sk-proj-...`

### Optional

- **`OPENAI_MODEL`** (optional, default: `gpt-3.5-turbo`)
  - The OpenAI model to use for all content generation
  - Available options:
    - `gpt-3.5-turbo` - Fastest, most economical (~$0.0005-0.0015/1K tokens)
    - `gpt-4o` - Balanced performance and cost (~$0.005-0.015/1K tokens)
    - `gpt-4-turbo` - Highest quality, most expensive (~$0.01-0.03/1K tokens)

- **`OPENAI_TEMPERATURE`** (optional, default: `0.7`)
  - Controls randomness/creativity of responses
  - Range: `0.0` to `1.0`
  - Lower values (0.0-0.3): More focused and deterministic
  - Higher values (0.8-1.0): More creative and random
  - Recommended: `0.7` for balanced output

- **`OPENAI_MAX_TOKENS_PARAGRAPH`** (optional, default: `2000`)
  - Maximum tokens for paragraph generation

- **`OPENAI_MAX_TOKENS_REWRITE`** (optional, default: `3000`)
  - Maximum tokens for content rewriting

- **`OPENAI_MAX_TOKENS_ARTICLE`** (optional, default: `4000`)
  - Maximum tokens for article generation

## Example Configuration

### .env.local
```bash
# Required
OPENAI_API_KEY=sk-proj-your-actual-api-key-here

# Optional - uncomment to customize
OPENAI_MODEL=gpt-4o
OPENAI_TEMPERATURE=0.8
OPENAI_MAX_TOKENS_PARAGRAPH=2500
OPENAI_MAX_TOKENS_REWRITE=3500
```

## Switching Models

To switch between models, simply update the `OPENAI_MODEL` environment variable:

1. Edit your `.env.local` file
2. Change `OPENAI_MODEL=gpt-3.5-turbo` to your desired model
3. Restart your development server

**Example:**
```bash
# Use GPT-4 for better quality
OPENAI_MODEL=gpt-4o

# Or use GPT-3.5 Turbo for speed and cost
OPENAI_MODEL=gpt-3.5-turbo
```

## Cost Optimization

### Development
- Use `gpt-3.5-turbo` for testing and development
- It's fast and economical (~50x cheaper than GPT-4)

### Production
- Consider `gpt-4o` for better quality at moderate cost
- Use `gpt-4-turbo` only when highest quality is required

## Adding New API Routes

When creating new content generation API routes, always use the centralized configuration:

```typescript
import { openAIConfig, validateOpenAIConfig } from '@/lib/config/openai';

export async function POST(request: NextRequest) {
  // Validate configuration
  try {
    validateOpenAIConfig();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Use centralized config
  const openai = new OpenAI({
    apiKey: openAIConfig.apiKey,
  });

  const completion = await openai.chat.completions.create({
    model: openAIConfig.model,
    temperature: openAIConfig.temperature,
    max_tokens: openAIConfig.maxTokens.paragraph, // or .rewrite, .article
    // ...
  });
}
```

## Troubleshooting

### API Key Not Configured Error
- Ensure `OPENAI_API_KEY` is set in `.env.local`
- Restart your development server after adding the key
- Check that the key starts with `sk-`

### Invalid Model Error
- Verify the model name is correct (case-sensitive)
- Check OpenAI's documentation for available models
- Some models require special API access

### Rate Limiting
- OpenAI has rate limits based on your account tier
- Consider implementing request queuing for high traffic
- Monitor usage at https://platform.openai.com/usage

## Best Practices

1. **Never commit `.env.local`** - Keep your API key secret
2. **Use different keys** for development and production
3. **Monitor usage** regularly to avoid unexpected costs
4. **Set reasonable max_tokens** to control costs
5. **Use lower temperature** (0.3-0.5) for factual content
6. **Use higher temperature** (0.7-0.9) for creative content

## Support

For OpenAI-specific issues, refer to:
- OpenAI Documentation: https://platform.openai.com/docs
- OpenAI API Status: https://status.openai.com
- Pricing: https://openai.com/pricing
