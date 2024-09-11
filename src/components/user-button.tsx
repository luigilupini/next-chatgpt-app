"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { enter, leave } from "@/server/auth";

import { useSession } from "next-auth/react";
import UserAvatar from "./user-avatar";

export default function UserButton() {
  const { status } = useSession();

  return (
    <div className={"flex items-center"}>
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="select-none">
              <UserAvatar className="size-8 border-border border rounded-full" />
            </button>
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
