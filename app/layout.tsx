import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devi Andriyan Subakti | Interactive CV & HR Portfolio",
  description:
    "Interactive portfolio of Devi Andriyan Subakti — HR Professional, Psychology Background, HR Digital Transformation, People Analytics, and AI-Assisted HR System Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}