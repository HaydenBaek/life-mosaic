"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { PaletteIcon } from "lucide-react"; // 🎨 Import Palette Icon

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    // Check if user is logged in (Replace this with real authentication check)
    const user = localStorage.getItem("user"); // Example: Check if user exists in localStorage
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">

        {/* LEFT SIDE - LOGO */}
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          {/* 🎨 Palette icon in Gold for contrast */}
          <PaletteIcon className="size-8 text-yellow-500" />
          <span className="bg-[hsl(var(--primary))] bg-clip-text text-transparent">
            LifeMosaic
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <div className="flex items-center space-x-4 ml-auto">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
