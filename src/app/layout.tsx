import type { Metadata } from "next";
import "@/app/globals.css";
import { auth } from "@/auth";
import Header from "@/components/header";
import ProviderTree from "@/state/provider-tree";
import { rubik, jetBrainsMono } from "@/lib/typeface/fonts";
import { redirect } from "next/navigation";

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
  console.log("session", session);
  if (!session) redirect("/api/auth/signin");
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${jetBrainsMono.variable} font-[family-name:var(--font-karla)] antialiased bg-background text-foreground`}
      >
        <ProviderTree session={session}>
          <Header />
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow">{children}</div>
          </div>
        </ProviderTree>
      </body>
    </html>
  );
}
