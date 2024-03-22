import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "./components/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universe",
  description: "With great power comes great responsibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout />
        {children}
      </body>
    </html>
  );
}
