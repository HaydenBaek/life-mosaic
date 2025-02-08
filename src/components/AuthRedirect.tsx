"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthRedirect() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); 

    const user = localStorage.getItem("user");

    if (user) {
 
      if (pathname === "/login" || pathname === "/") {
        router.replace("/dashboard");
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);
  

  if (!isClient) return null; 

  return null;
}
