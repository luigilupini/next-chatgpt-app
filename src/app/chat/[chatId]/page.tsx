import Message from "@/components/chat/message";
import { getChat } from "@/server/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ChatDetail({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;
  const chat = await getChat(+chatId);
  if (!chat) return notFound();
  return (
    <main className="flex flex-col p-5 size-full flex-1 overflow-hidden">
      <Message id={+chatId} messages={chat?.messages || []} key={chatId} />
    </main>
  );
}
