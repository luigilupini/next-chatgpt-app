import { Karla, Rubik, JetBrains_Mono } from "next/font/google";
// import localFont from "next/font/local";

export const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet-mono",
});

// export const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// export const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
