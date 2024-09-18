"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { useMounted } from '@/hooks/use-mounted';

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const [audioIndex, setAudioIndex] = useState(0);
  const audioFiles = ["/sounds/switch-on.mp3", "/sounds/switch-off.mp3"];

  const handleClick = (theme: string) => {
    setTheme(theme);
    const audio = new Audio(audioFiles[audioIndex]);
    audio.play();
    setAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  if (!mounted) return null;
  const Icon = theme === "light" ? Sun : Moon;
  return (
    <button
      onClick={() => handleClick(theme === "light" ? "dark" : "light")}
      className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full border border-border transition-all delay-75 duration-150 ease-in-out hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[-10px_-10px_30px_4px_hsl(var(--primary)/0.2),_5px_5px_15px_4px_hsl(var(--primary)/0.35)]"
    >
      <Icon
        className="size-4 animate-spin animate-normal animate-fill-both animate-once animate-ease-out"
        data-id="theme-toggle"
      />
    </button>
  );
}
