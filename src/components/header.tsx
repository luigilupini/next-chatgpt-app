import Link from 'next/link';
import { Suspense } from 'react';

import ThemeToggle from '@/components/theme-toggle';
import UserButton from '@/components/user-button';

import PreviousChats, { PreviousChatsFallbackBtn } from './previous-chats';

export default async function Header() {
  return (
    <header className="bg-card text-card-foreground font-bold p-2 mb-3 rounded-b-lg shadow-md mx-4 flex justify-between items-center px-4 gap-3">
      <div className="flex gap-3">
        <Link href="/">Home</Link>
        <Link href="/about" className="font-light">
          About
        </Link>
      </div>
      <div className="flex gap-3">
        {/* EXPERIMENT WITH THE REMOVAL OF THE SUSPENSE BOUNDARY */}
        <ThemeToggle />
        <Suspense fallback={<PreviousChatsFallbackBtn />}>
          <PreviousChats />
        </Suspense>
        <UserButton />
      </div>
    </header>
  );
}
