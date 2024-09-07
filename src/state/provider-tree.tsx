"use client";

import React from "react";
import ThemeProvider from "./leaf/theme";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = PropsWithChildren<{
  session: Session | null;
}>;

export default function ProviderTree({ session, children }: Props) {
  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
