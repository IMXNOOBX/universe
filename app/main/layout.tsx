import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Universe",
  description: "With great power comes great responsibility.",
};

export default function IntroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-red overflow-x-hidden">
      {children}
    </div>
  );
}
