import Message from "@/components/chat/message";

export default async function Home() {
  return (
    <main className="flex flex-col p-5 size-full flex-1 overflow-hidden">
      <Message />
    </main>
  );
}
