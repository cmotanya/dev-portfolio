import type { Metadata } from "next";
import "./globals.css";
import { grotesque } from "./data/font";
import Header from "./header/page";
import Footer from "./footer/page";

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
      <body className={`relative ${grotesque.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
