import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Akhil Chaudhary — Fullstack Developer & App Architect",
  description: "Personal portfolio of Akhil Chaudhary, a premium Fullstack Developer and React Native expert. Delivering performant Android, iOS, and Web solutions.",
  keywords: [
    "Akhil Chaudhary",
    "Fullstack Developer",
    "React Native",
    "React JS",
    "Django Backend",
    "Node JS Freelancer",
    "Ghaziabad Developer",
    "Mobile App Developer",
    "Premium Web Design"
  ],
  authors: [{ name: "Akhil Chaudhary" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Akhil Chaudhary — Fullstack Developer & App Architect",
    description: "Discover premium Web and Mobile Application solutions. Explore works, reviews, and technical capabilities.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} dark scroll-smooth antialiased`}
    >
      <body className="bg-[#08080a] text-neutral-100 font-sans min-h-screen selection:bg-[#e94b3c]/35 selection:text-white">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
