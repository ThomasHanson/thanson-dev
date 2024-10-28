"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { LayoutProvider, useLayout } from "@/app/context/layout-context";
import React from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head>
        <link rel="Shortcut icon" href="/public/images/favicon.ico" />
      </head>

      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" enableSystem>
          <LayoutProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </LayoutProvider>
        </ThemeProvider>
      </body>
      
      <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      />
    </html>
  );
}

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isFullWidth } = useLayout();
  return (
    <div className="mx-auto px-4">
      <header className="max-w-7xl mx-auto">
        <Navbar />
      </header>
      <main className={`${isFullWidth ? "max-w-7xl" : "max-w-5xl"} mx-auto`}>
        {children}
      </main>
    </div>
  );
};
