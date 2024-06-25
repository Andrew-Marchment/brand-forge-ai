import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/_styles/globals.css";
import { ThemeProvider } from "./_components/ThemeProvider";
import { ModeToggle } from "./_components/ModeToggle";
import Image from "next/image";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brand Forge AI",
  description: "AI powered app that generates names and logos for companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PQEZVTDPCK"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-PQEZVTDPCK');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="fixed h-14 w-full bg-background">
            <div className="fixed right-2 top-2">
              <ModeToggle />
            </div>
            <div className="fixed left-2 top-2">
              <Image
                src="/logo.png"
                alt="Brand Forge AI"
                width={160}
                height={40}
              />
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
