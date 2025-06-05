import {
  Caveat_Brush as Caveat,
  Fira_Sans_Condensed as Inter,
} from "next/font/google";

export const caveat = Caveat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
});

export const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
