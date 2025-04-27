import {
  Bricolage_Grotesque as Grotesque,
  Caveat_Brush as Caveat,
  Poppins,
  Nunito,
} from "next/font/google";

export const grotesque = Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const nunito = Nunito({
  variable: "--font-geist-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const caveat = Caveat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
});
