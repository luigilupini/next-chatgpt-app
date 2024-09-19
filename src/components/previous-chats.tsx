import { MessageCircle, MessagesSquare, RefreshCcw } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

import { auth as getServerSession } from '@/auth';
import Transcript from '@/components/transcript';
import { Button } from '@/components/ui/button';
import {
    Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger
} from '@/components/ui/sheet';
import { delay, lastSeen } from '@/lib/utils';
import { getChatsWithMessages } from '@/server/db';

import DeleteChatButton from './chat/delete-chat-button';

export default async function PreviousChats() {
  noStore();
  const session = await getServerSession();
  const chats = await getChatsWithMessages(session?.user?.email!);
  await delay(3000); // Simulate network latency
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant="outline"
          className="center size-8 rounded-full"
        >
          <MessageCircle className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Previous Sessions</SheetTitle>
          <SheetDescription className="text-opacity-60">
            Select chat session to view its transcript
          </SheetDescription>
        </SheetHeader>
        <section className="h-[90%] overflow-y-auto my-4">
          <div className="space-y-6">
            {chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="relative group border block border-border rounded-md hover:border-primary bg-card text-card-foreground"
              >
                <div className="overflow-hidden center gap-6 w-full py-1 border-b border-border group-hover:text-primary mb-2">
                  <span className="truncate font-semibold text-xs block pl-2 w-full">
                    {chat.name}
                  </span>
                  <span className="font-semibold text-xs mr-2 py-0 px-1 w-fit text-nowrap center">
                    <MessagesSquare className="mr-1" size={14} />
                    {chat.messages.length}
                  </span>
                </div>

                <Transcript messages={chat.messages.slice(0, 2)} />
                <div className="between">
                  <span className="text-[10px] italic flex-1 p-2 text-left">
                    Created: {lastSeen(chat.timestamp)}
                  </span>
                  <DeleteChatButton id={chat.id} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}

export const PreviousChatsFallbackBtn = () => {
  return (
    <div className="group ">
      <button className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full border border-border transition-all delay-75 duration-150 ease-in-out hover:border-primary-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[-10px_-10px_30px_4px_hsl(var(--primary)/0.2),_5px_5px_15px_4px_hsl(var(--primary)/0.35)]">
        <RefreshCcw
          className="size-[1rem] animate-spin animate-normal animate-fill-both animate-infinite animate-ease-out"
          data-id="theme-toggle"
        />
      </button>
    </div>
  );
};
