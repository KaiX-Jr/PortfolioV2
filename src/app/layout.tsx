import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Swapnoneel Mondal — Software Engineer & Computer Science Scholar",
  description:
    "Official portfolio of Swapnoneel Mondal, a Computer Science student at IEM Kolkata specializing in high-performance frontend engineering, interactive web applications, and data analytics.",
  keywords: [
    "Swapnoneel Mondal",
    "Portfolio",
    "IEM Kolkata",
    "Computer Science",
    "Frontend Engineer",
    "React",
    "Next.js",
    "Data Analytics",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${inter.variable} dark scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen antialiased flex flex-col"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
