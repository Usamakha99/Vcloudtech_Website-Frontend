import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { IntroGate } from "@/components/intro/IntroGate";
import { INTRO_BLOCK_SCRIPT } from "@/components/intro/intro-block-script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "vCloudTech — Enterprise IT solutions",
    template: "%s | vCloudTech",
  },
  description:
    "Enterprise IT solutions: cloud migration, managed infrastructure, and 24/7 operations for organizations that require security, scale, and governance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BLOCK_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <IntroGate>{children}</IntroGate>
      </body>
    </html>
  );
}
