import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Watermark from "./components/utils/Watermark";
import Favicon from '@/app/favicon.ico'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universe",
  icons: [{
    rel: "icon",
    href: "/favicon.ico",
    url: "/favicon.ico", // Add the missing 'url' property
  }],
  description: "Dive into my universe of pojects in my portfolio.",
  twitter: {
    title: "Universe",
    card: "summary",
    images: [ 
      { url: process.env.DOMAIN + '/favicon.ico' },
      { url: "https://opengraph.githubassets.com/1/IMXNOOBX/my-universe" }, 
    ]
  },
  authors: [{ name: "@IMXNOOBX", url: "https://github.com/IMXNOOBX" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " " + "bg-zinc-700"}>
        <Layout />
        <div className="h-screen px-10 md:px-32">
          <Navbar />
          {children}
        </div>
        <Watermark />
      </body>
    </html>
  );
}
