import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shivam",
  description: "Developer's Portfolio",
  icons: {
    icon: "favicon.ico",
    apple: "apple-touch-icon.png",
  },
  metadataBase: new URL(process.env.PUBLIC_URL || ""),
  openGraph: {
    type: "website",
    url: process.env.PUBLIC_URL || "",
    title: "Shivam",
    description: "Developer's Portfolio",
    siteName: "Shivam",
    images: [
      {
        url: `${process.env.PUBLIC_URL}/opengraph-image.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam",
    description: "Developer's Portfolio",
    creator: "@sethshivam11",
    siteId: "765045797750706176",
    images: [
      {
        url: `${process.env.PUBLIC_URL}/opengraph-image.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
      },
    ],
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
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster position="bottom-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
