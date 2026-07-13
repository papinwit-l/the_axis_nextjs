import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getContact } from "@/lib/wordpress";
import { GoogleTagManager } from "@next/third-parties/google";

// const acciaPiano = localFont({
//   src: [
//     { path: "../../public/fonts/AcciaPiano-Light.ttf", weight: "300" },
//     { path: "../../public/fonts/AcciaPiano-Regular.ttf", weight: "400" },
//     { path: "../../public/fonts/AcciaPiano-Medium.ttf", weight: "500" },
//   ],
//   variable: "--font-display",
//   display: "swap",
// });

// const instrumentSans = localFont({
//   src: [
//     { path: "../../public/fonts/InstrumentSans-Regular.ttf", weight: "400" },
//     { path: "../../public/fonts/InstrumentSans-SemiBold.ttf", weight: "600" },
//     { path: "../../public/fonts/InstrumentSans-Bold.ttf", weight: "700" },
//   ],
//   variable: "--font-body",
//   display: "swap",
// });

// const myriadPro = localFont({
//   src: [{ path: "../../public/fonts/MyriadPro-Regular.otf", weight: "400" }],
//   variable: "--font-alt",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "The Axis Utthayan | Modern Classic Monochrome Luxury Residences",
  description:
    "A collection of modern classic monochrome luxury 3-storey residences nestled along Utthayan Road, one of Bangkok's most beautiful roads. 9 units, 64.4–164.1 sq.wah.",
  keywords: [
    "The Axis",
    "Utthayan",
    "luxury house",
    "modern classic",
    "monochrome",
    "3-storey house",
    "Bangkok",
    "Utthayan Road",
    "Aksa Road",
    "บ้านหรู",
    "อุทยาน",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-NLGLMN32"}
      />
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
