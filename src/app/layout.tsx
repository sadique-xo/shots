import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shots — Create Stunning Dribbble Shots in Seconds",
  description:
    "Free tool to generate beautifully styled Dribbble shots. Upload your screenshot, pick a style, and export pixel-perfect PNGs. No signup required.",
  keywords: ["dribbble", "shots", "mockup", "design", "screenshot", "generator"],
  authors: [{ name: "Sadique", url: "https://sadique.co" }],
  openGraph: {
    title: "Shots — Create Stunning Dribbble Shots in Seconds",
    description:
      "Free tool to generate beautifully styled Dribbble shots. Upload your screenshot, pick a style, and export pixel-perfect PNGs. No signup required.",
    url: "https://shots.sadique.co",
    siteName: "Shots",
    images: [
      {
        url: "/images/shots-Social-Image.webp",
        width: 1200,
        height: 630,
        alt: "Shots Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shots — Create Stunning Dribbble Shots in Seconds",
    description:
      "Free tool to generate beautifully styled Dribbble shots. Upload your screenshot, pick a style, and export pixel-perfect PNGs. No signup required.",
    images: ["/images/shots-Social-Image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased font-[var(--font-dm-sans)]`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
