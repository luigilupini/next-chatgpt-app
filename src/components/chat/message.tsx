"use client";
import { useChat } from 'ai/react';
import { Loader, Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/user-avatar';
import useScrollBottom from '@/hooks/use-scroll-bottom';
import { cn } from '@/lib/utils';
import { updateChat } from '@/server/ai/update-chat';

import type { Message as AIMessage } from "ai";
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MessagesProps {
  id?: number | null;
  messages?: Message[];
}

export default function Message({
  id = null,
  messages: initialMessages = [],
}: MessagesProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: initialMessages as unknown as AIMessage[],
    });

  const chatId = useRef<number | null>(id);

  useEffect(() => {
    (async () => {
      if (!isLoading && messages.length) {
        const simplifiedMessages = messages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        }));
        await updateChat(chatId.current, simplifiedMessages);
      }
    })();
  }, [messages, isLoading]);

  return (
    <Card className="flex flex-col w-full h-fit mt-auto p-2 overflow-hidden">
      <Messages messages={messages as Message[]} />
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex border-t-2 border-dashed border-border/50 pt-2 mt-3",
          { "border-none pt-0 mt-0": messages.length === 0 }
        )}
      >
        <Input
          disabled={isLoading}
          className="flex-grow placeholder:opacity-50 text-sm"
          placeholder={"Type a message..."}
          value={input}
          onChange={handleInputChange}
          autoFocus
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant={"outline"}
          className="ml-3 center gap-2"
        >
          {isLoading ? (
            <Loader className="animate-spin stroke-primary" size={14} />
          ) : (
            <Send size={14} />
          )}
          Send
        </Button>
      </form>
    </Card>
  );
}

export const Messages = ({ messages }: { messages: Message[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollBottom(scrollRef, 500);
  return (
    <section
      ref={scrollRef}
      style={{ overflowY: "scroll" }}
      className="flex flex-col flex-1 overflow-y-scroll"
    >
      {messages.map((message, i) => (
        <div
          key={i}
          className={`relative center flex-col px-2 py-2 ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`relative rounded-md py-2 px-4 text-xs center gap-2 ${
              message.role === "user"
                ? "bg-accent/50 text-accent-foreground/80"
                : "bg-accent text-accent-foreground"
            }`}
          >
            {message.role === "assistant" && <AssistantRole />}
            <p className="flex-1 leading-relaxed">{message.content}</p>
            {message.role === "user" && <UserRole />}
          </div>
        </div>
      ))}
    </section>
  );
};

export const UserRole = () => {
  return (
    <div className="size-6 border border-border rounded-full bg-card absolute -top-2 -right-2">
      <UserAvatar className="size-full" />
    </div>
  );
};

export const AssistantRole = () => {
  return (
    <div className="p-[2px] size-6 border border-primary/10 rounded-full bg-primary/20 absolute -top-2 -left-2 backdrop-blur-3xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 24 24"
        className="size-full fill-primary"
      >
        <path d="M15.62,3.66l-1.27,0.79c-0.835-1.34-2.321-2.077-3.916-1.919C8.308,2.742,6.75,4.65,6.75,6.786l0,4.404l5.63,3.34	l-0.76,1.29l-5.879-3.48C5.437,12.16,5.25,11.833,5.25,11.48l0-4.632c0-2.938,2.161-5.55,5.087-5.814	C12.488,0.839,14.499,1.853,15.62,3.66z"></path>
        <path d="M6.587,4.695L6.637,6.19c-1.578,0.053-2.959,0.972-3.62,2.432c-0.881,1.946-0.007,4.25,1.843,5.318l3.814,2.202l5.707-3.206	l0.737,1.303l-5.953,3.352c-0.308,0.173-0.685,0.171-0.991-0.005L4.163,15.27C1.619,13.8,0.437,10.624,1.671,7.957	C2.579,5.997,4.461,4.762,6.587,4.695z"></path>
        <path d="M2.967,13.035l1.319,0.705c-0.743,1.393-0.638,3.049,0.296,4.35c1.245,1.736,3.677,2.131,5.527,1.063l3.814-2.202	l0.077-6.546l1.497,0.013l-0.074,6.831c-0.004,0.353-0.194,0.679-0.5,0.855l-4.012,2.316c-2.544,1.469-5.887,0.904-7.579-1.498	C2.091,17.158,1.963,14.91,2.967,13.035z"></path>
        <path d="M8.38,20.34l1.27-0.79c0.835,1.34,2.321,2.077,3.916,1.919c2.126-0.211,3.684-2.119,3.684-4.255l0-4.404l-5.63-3.34	l0.76-1.29l5.879,3.48c0.304,0.18,0.491,0.507,0.491,0.861l0,4.632c0,2.938-2.161,5.55-5.087,5.814	C11.512,23.161,9.501,22.147,8.38,20.34z"></path>
        <path d="M17.413,19.305l-0.049-1.495c1.578-0.053,2.959-0.972,3.62-2.432c0.881-1.946,0.007-4.25-1.843-5.318l-3.814-2.202	l-5.707,3.206L8.882,9.761l5.953-3.352c0.308-0.173,0.685-0.171,0.991,0.005l4.012,2.316c2.544,1.469,3.726,4.646,2.492,7.312	C21.421,18.003,19.539,19.238,17.413,19.305z"></path>
        <path d="M21.033,10.965l-1.319-0.705c0.743-1.393,0.638-3.049-0.296-4.35c-1.245-1.736-3.677-2.131-5.527-1.063l-3.814,2.202	l-0.077,6.546l-1.497-0.013l0.074-6.831c0.004-0.353,0.194-0.679,0.5-0.855l4.012-2.316c2.544-1.469,5.887-0.904,7.579,1.498	C21.909,6.842,22.037,9.09,21.033,10.965z"></path>
        <path
          d="M13.146,22.49c-1.447,0-2.83-0.62-3.796-1.7c-0.096-0.107-0.232-0.167-0.373-0.167	c-0.029,0-0.06,0.003-0.089,0.008c-0.327,0.06-0.66,0.09-0.991,0.09c-1.707,0-3.221-0.76-4.155-2.085	c-0.94-1.336-1.188-2.989-0.68-4.535c0.055-0.165,0.02-0.347-0.093-0.479C1.646,12.06,1.314,9.919,2.125,8.167	C2.812,6.684,4.12,5.643,5.712,5.311c0.171-0.035,0.311-0.156,0.369-0.32c0.691-1.928,2.379-3.285,4.301-3.459	c0.158-0.015,0.315-0.021,0.472-0.021c1.447,0,2.83,0.62,3.796,1.7c0.096,0.107,0.232,0.167,0.373,0.167	c0.029,0,0.06-0.003,0.089-0.008c0.327-0.06,0.66-0.09,0.991-0.09c1.707,0,3.221,0.76,4.155,2.085	c0.94,1.336,1.188,2.989,0.68,4.535c-0.055,0.165-0.02,0.347,0.093,0.479c1.323,1.562,1.655,3.702,0.845,5.454	c-0.688,1.483-1.995,2.524-3.587,2.856c-0.171,0.035-0.311,0.156-0.369,0.32c-0.691,1.928-2.379,3.285-4.301,3.459	C13.46,22.483,13.303,22.49,13.146,22.49z M13.995,10.879l-1.968-1.168l-1.995,1.121l-0.027,2.288l1.968,1.168l1.995-1.121	L13.995,10.879z"
          opacity=".4"
        ></path>
      </svg>
    </div>
  );
};
