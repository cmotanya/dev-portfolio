import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./data/font";
import Header from "./header/page";
import Footer from "./footer/page";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title: "Cornelius Motanya | Portfolio",
  description:
    "Frontend developer portfolio describing my skills and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-dvh flex-col text-sm antialiased ${inter.className}`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
