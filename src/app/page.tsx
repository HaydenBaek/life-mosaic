"use client"; // Required for useRouter

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Import utility for conditional classes

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background px-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl space-y-4">
        <h1 className="text-5xl font-extrabold text-foreground tracking-tight">
          Welcome to <span className="text-primary">LifeMosaic</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Plan, track, and visualize your journey. Start documenting your progress today.
        </p>
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => router.push("/login")}
        className={cn(
          "mt-8 px-6 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg transition-all duration-300"
        )}
      >
        Get Started
      </Button>

      {/* Subtext */}
      <p className="text-muted-foreground text-sm mt-6">
        Transform your achievements into a beautiful journey.
      </p>

      {/* 📝 Why I Created LifeMosaic */}
      <div className="mt-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-foreground">Why I Created LifeMosaic</h2>
        <p className="text-lg text-muted-foreground mt-4">
          Life can be overwhelming. Between school, responsibilities, and the uncertainty of the future, it is easy to feel lost or unmotivated. 
          I built LifeMosaic as a way to bring clarity and purpose to those moments. By visualizing the future you want and breaking it down into meaningful steps, 
          LifeMosaic helps turn dreams into reality. This is not just a place to track accomplishments. It is a reminder that progress, no matter how small, is always worth celebrating.
        </p>
      </div>
    </div>
  );
}
