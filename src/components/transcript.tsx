import { Message } from '@/types';

import { AssistantRole, UserRole } from './chat/message';

const truncateText = (str: string, length: number) =>
  str.length > length ? str.slice(0, length) + "..." : str;

export default function Transcript({
  messages,
  truncate = true,
}: {
  messages: Message[];
  truncate?: boolean;
}) {
  return (
    <section className="flex flex-col flex-1 gap-1 p-4">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`relative center flex-col gap-2 ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`rounded-md py-1 px-4 text-xs center gap-2 overflow-hidden ${
              message.role === "user"
                ? "bg-accent/50 text-accent-foreground/80 mb-1"
                : "bg-accent text-accent-foreground"
            }`}
          >
            {message.role === "assistant" && <AssistantRole />}
            <p className="flex-1 leading-relaxed">
              {truncate ? truncateText(message.content, 40) : message.content}
            </p>
            {message.role === "user" && <UserRole />}
          </div>
        </div>
      ))}
    </section>
  );
}
