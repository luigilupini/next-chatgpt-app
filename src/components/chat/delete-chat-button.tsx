"use client";

import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { deleteChat } from '@/server/db';

export default function DeleteChatButton({ id }: { id: number }) {
  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      className="text-[10px] italic text-right p-2 center gap-1 m-1"
      onClick={() => deleteChat(id)}
    >
      <Trash size={12} />
    </Button>
  );
}
