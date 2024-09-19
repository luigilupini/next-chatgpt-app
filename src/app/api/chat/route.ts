import { convertToCoreMessages, streamText } from 'ai';
import { NextRequest } from 'next/server';

import { auth } from '@/auth';
import { openai } from '@ai-sdk/openai';

export const runtime = "edge";

export const POST = auth(async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
});
