import {
  Bricolage_Grotesque as Grotesque,
  Schibsted_Grotesk as Schibsted,
  Big_Shoulders_Display as BigShoulder,
  Caveat_Brush as Caveat,
} from "next/font/google";

export const grotesque = Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const schibsted = Schibsted({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const bigShoulder = BigShoulder({
  variable: "--font-geist-serif",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const caveat = Caveat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
});
