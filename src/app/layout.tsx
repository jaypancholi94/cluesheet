import type { Metadata } from "next";
import localFont from "next/font/local";
import { Audiowide } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const initAudioWide = Audiowide({
  weight: ["400"],
  variable: "--font-audiowide",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClueSheet",
  description:
    "ClueSheet is a sleek and intuitive tool designed for Cluedo enthusiasts to streamline their clue tracking during gameplay. With ClueSheet, you can easily record, organize, and visualize the clues you gather, helping you make smarter deductions and solve the mystery faster. Whether you're tracking suspects, weapons, or rooms, ClueSheet keeps everything in one place, ensuring you never miss a clue!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${initAudioWide.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
