import type { Metadata } from "next";
import '@/app/globals.css';

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import Header from '@/components/header';
import { jetBrainsMono, rubik } from '@/lib/typeface/fonts';
import ProviderTree from '@/state/provider-tree';

export const metadata: Metadata = {
  title: "Next.js ChatGPT App",
  description: "Next.js + OpenAI + ChatGPT",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    // Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  if (!session) redirect("/api/auth/signin");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${jetBrainsMono.variable} antialiased flex flex-col h-screen w-screen`}
      >
        <ProviderTree session={session}>
          <Header />
          {children}
        </ProviderTree>
      </body>
    </html>
  );
}
