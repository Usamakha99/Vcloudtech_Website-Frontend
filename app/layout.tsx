import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";

import { montserrat } from "@/app/fonts/montserrat";
import { IntroAppProvider } from "@/components/intro/IntroAppProvider";
import { INTRO_BLOCK_SCRIPT } from "@/components/intro/intro-block-script";
import { publicAssets } from "@/lib/public-assets";
import "./globals.css";

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
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    apple: [{ url: "/brand/favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BLOCK_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <IntroAppProvider src={publicAssets.intro.loaderVideo}>{children}</IntroAppProvider>
      </body>
    </html>
  );
}
