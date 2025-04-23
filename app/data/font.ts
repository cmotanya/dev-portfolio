import {
  Bricolage_Grotesque as Grotesque,
  Big_Shoulders_Display as BigShoulder,
  Caveat_Brush as Caveat,
  Poppins,
} from "next/font/google";

export const grotesque = Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
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
