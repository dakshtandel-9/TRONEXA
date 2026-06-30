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

const BASE_URL = "https://www.tronexa.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TRONEXA — Intelligent Digital Solutions",
    template: "%s | TRONEXA",
  },
  description:
    "TRONEXA delivers intelligent digital solutions across Web, AI, Cloud, CRM, ServiceNow, IoT, and enterprise IT services. Trusted by global enterprises.",
  keywords: [
    "TRONEXA",
    "intelligent digital solutions",
    "web development",
    "AI solutions",
    "cloud services",
    "CRM",
    "ServiceNow",
    "IoT",
    "enterprise IT",
    "digital transformation",
  ],
  authors: [{ name: "TRONEXA", url: BASE_URL }],
  creator: "TRONEXA",
  publisher: "TRONEXA",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "TRONEXA",
    title: "TRONEXA — Intelligent Digital Solutions",
    description:
      "TRONEXA delivers intelligent digital solutions across Web, AI, Cloud, CRM, ServiceNow, IoT, and enterprise IT services.",
    images: [{ url: "/og-image.png", width: 1080, height: 1080, alt: "TRONEXA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRONEXA — Intelligent Digital Solutions",
    description:
      "Intelligent digital solutions across Web, AI, Cloud, CRM, ServiceNow, IoT, and enterprise IT services.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "192x192", type: "image/png" }],
  },
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
