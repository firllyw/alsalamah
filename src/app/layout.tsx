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
  title: "Al Salamah Transportation - Logistics & Distribution Services in Saudi Arabia",
  description: "Driving reliable distribution across Saudi Arabia & beyond. Cold chain transportation, dry goods distribution, last-mile delivery, and fleet leasing services.",
  keywords: "logistics, transportation, Saudi Arabia, cold chain, distribution, fleet leasing, Jeddah, Riyadh",
  authors: [{ name: "Al Salamah Transportation" }],
  openGraph: {
    title: "Al Salamah Transportation",
    description: "Driving reliable distribution across Saudi Arabia & beyond",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
