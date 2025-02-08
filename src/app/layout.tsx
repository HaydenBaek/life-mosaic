import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import AuthRedirect from "@/components/AuthRedirect"; // ✅ Import AuthRedirect

export const metadata: Metadata = {
  icons: {
    icon: "/lifemosaic.ico",
    apple: "/lifemosaic.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthRedirect /> {/* ✅ Ensure logged-in users can't access login page */}
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
