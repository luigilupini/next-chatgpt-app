"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const initials = (str?: string | null) => {
  const match = (str || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
};

export default function UserAvatar({ className }: { className?: string }) {
  const { data: session } = useSession();
  return (
    <div className={cn("center", className)}>
      <Avatar className="size-full">
        {session?.user?.image && <AvatarImage src={session.user.image} />}
        <AvatarFallback className="text-sm">
          {initials(session?.user?.name)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
