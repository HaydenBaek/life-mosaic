import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main> 
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
