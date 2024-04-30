import "@/styles/globals.css";

import { Inter } from "next/font/google";
import React from "react";

import PageLayout from "@/app/(authed)/_components/page-layout";
import { ThemeProvider } from "@/app/(authed)/_components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Home Finance",
  description: "A simple home finance app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <TRPCReactProvider>
              <PageLayout>{children}</PageLayout>
            </TRPCReactProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
