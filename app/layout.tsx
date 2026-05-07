import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "어버이날 축하",
  description: "사랑하고 감사합니다",

  openGraph: {
    title: "어버이날 축하",
    description: "사랑하고 감사합니다",
    images: [
      {
        url: "/4.jpg",
        width: 1200,
        height: 630,
        alt: "어버이날 축하 이미지",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "어버이날 축하",
    description: "사랑하고 감사합니다",
    images: ["/4.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
