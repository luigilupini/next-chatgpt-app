"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { enter, leave } from "@/server/auth";

import { useSession } from "next-auth/react";

const initials = (str?: string | null) => {
  const match = (str || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
};

export default function UserButton() {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center">
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              {session?.user?.image && <AvatarImage src={session.user.image} />}
              <AvatarFallback className="text-sm">
                {initials(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mx-2">
            <DropdownMenuItem onClick={() => leave()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === "unauthenticated" && (
        <Button onClick={() => enter()}>Sign in</Button>
      )}
    </div>
  );
}
