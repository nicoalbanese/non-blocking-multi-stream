import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const prompt = await req.json();

  const result = streamObject({
    model: openai('gpt-4o'),
    system: "Make sure to capitalize names.",
    prompt,
    schema: z.object({
      name: z.string(),
      favoriteTeam: z.string(),
    })
  });

  return result.toTextStreamResponse();
}