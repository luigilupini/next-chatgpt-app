import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import Message from '@/components/chat/message';
import { getChat } from '@/server/db';

export default async function ChatDetail({
  params,
}: {
  params: { chatId: string };
}) {
  noStore();
  const { chatId } = params;
  const chat = await getChat(+chatId);
  if (!chat) return notFound();
  return (
    <main className="flex flex-col p-5 size-full flex-1 overflow-hidden">
      <Message id={+chatId} messages={chat?.messages || []} key={chatId} />
    </main>
  );
}
