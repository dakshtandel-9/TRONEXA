import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MediaSessionSuppressor from "@/components/MediaSessionSuppressor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRONEXA — Intelligent Digital Solutions",
  description: "TRONEXA delivers intelligent digital solutions across Web, AI, Cloud, CRM, ServiceNow, IoT, and enterprise IT services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        <MediaSessionSuppressor />
        {children}
      </body>
    </html>
  );
}
