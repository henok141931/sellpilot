import OpenAI from 'openai';

// Ensure the API key is available
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("OPENAI_API_KEY is missing from environment variables.");
}

export const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key-for-build',
});
