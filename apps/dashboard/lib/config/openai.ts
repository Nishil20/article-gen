/**
 * Centralized OpenAI Configuration
 *
 * This file contains all OpenAI-related configuration settings.
 * All API routes should import and use these settings to ensure consistency.
 */

export const openAIConfig = {
  /**
   * The OpenAI model to use for content generation
   * Can be configured via OPENAI_MODEL environment variable
   * Default: gpt-3.5-turbo
   *
   * Available options:
   * - gpt-3.5-turbo (fastest, most economical)
   * - gpt-4o (balanced performance and cost)
   * - gpt-4-turbo (highest quality, most expensive)
   */
  model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',

  /**
   * The OpenAI API key
   * Must be set in environment variables
   */
  apiKey: process.env.OPENAI_API_KEY,

  /**
   * Default temperature for content generation
   * Higher values (0.8-1.0) = more creative/random
   * Lower values (0.0-0.3) = more focused/deterministic
   * Default: 0.7 (balanced)
   */
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),

  /**
   * Default max tokens for responses
   * Can be overridden per API route as needed
   */
  maxTokens: {
    paragraph: parseInt(process.env.OPENAI_MAX_TOKENS_PARAGRAPH || '2000'),
    rewrite: parseInt(process.env.OPENAI_MAX_TOKENS_REWRITE || '3000'),
    article: parseInt(process.env.OPENAI_MAX_TOKENS_ARTICLE || '4000'),
  },
} as const;

/**
 * Validate that OpenAI configuration is properly set
 * @throws Error if API key is not configured
 */
export function validateOpenAIConfig() {
  if (!openAIConfig.apiKey) {
    throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.');
  }
}

/**
 * Get the configured OpenAI model name
 * @returns The model name to use for API calls
 */
export function getOpenAIModel(): string {
  return openAIConfig.model;
}
