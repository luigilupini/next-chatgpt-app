import Link from "next/link";
import UserButton from "@/components/user-button";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="bg-card text-card-foreground font-bold p-2 mb-3 rounded-b-lg shadow-md mx-4 flex justify-between items-center px-4 gap-3">
      <div className="flex gap-3">
        <Link href="/">Home</Link>
        <Link href="/about" className="font-light">
          About
        </Link>
      </div>
      <div className="flex gap-3">
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
}
