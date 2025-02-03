import Image from "next/image";
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/login-form"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-24 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LoginForm />
    </div>
  );
}

