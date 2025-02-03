"use client";  // Required for useRouter

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter(); // ✅ Initialize useRouter

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button onClick={() => router.push("/login")}>Go to Login</Button>
    </div>
  );
}
