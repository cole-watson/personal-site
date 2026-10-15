import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { profile } from "@/content/resume";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `${profile.title} in ${profile.location}. ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.title}`,
  description,
  openGraph: {
    title: profile.name,
    description,
    url: "/",
    siteName: profile.name,
    type: "profile",
  },
  twitter: { card: "summary_large_image" },
};

// Applies the saved (or OS) theme before first paint so there's no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
