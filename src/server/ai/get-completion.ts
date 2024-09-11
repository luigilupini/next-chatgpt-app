"use server";

import { auth } from "@/auth";
import OpenAI from "openai";
import { createChat, updateChat } from "../db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface GetCompletionProps {
  id: number | null;
  messageHistory: {
    role: "user" | "assistant";
    content: string;
  }[];
}

export async function getCompletion({
  id,
  messageHistory,
}: GetCompletionProps) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messageHistory,
  });

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as {
      role: "user" | "assistant";
      content: string;
    },
  ];

  const session = await auth();
  let chatId = id;

  if (!chatId) {
    chatId = await createChat(
      session?.user?.email!,
      messageHistory[0].content,
      messages
    );
  } else {
    await updateChat(chatId, messages);
  }

  return {
    id: chatId,
    messages,
  };
}
