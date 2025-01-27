import type { Metadata } from "next";
import Script from 'next/script'
import { Inter } from "next/font/google";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Watermark from "./components/utils/Watermark";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universe",
  keywords: ['portfolio', 'projects', 'IMXNOOBX', 'IMXNOOBX Portfolio', 'noob', 'noob portfolio', 'noob projects', 'discord', 'discord bot'],
  icons: [
    {
      rel: "icon",
      href: "/favicon.ico",
      url: "/favicon.ico",
    }
  ],
  description: "Dive into my universe of pojects in my portfolio.",
  twitter: {
    title: "Universe",
    card: "summary_large_image",
    images: [
      { url: process.env.DOMAIN + '/assets/banner.png' },
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
    <>
      {process.env.NODE_ENV !== 'development' && (
        <Script
          defer
          src="https://metrics.noob.bio/script.js"
          data-website-id="45dbe995-b3be-41b2-9904-0d30c35de7ab"
        />
      )}
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
    </>
  );
}
