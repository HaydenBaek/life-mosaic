"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react"; //    Import Logout Icon
import { BookOpenIcon, TargetIcon, UsersIcon, CheckCircleIcon } from "lucide-react";

// List of dashboard actions
const actions = [
  {
    title: "Diary",
    description: "Write down your thoughts and experiences.",
    icon: BookOpenIcon,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-500",
    link: "/dashboard/diary",
  },
  {
    title: "Goal Setting",
    description: "Set goals with an image URL & price.",
    icon: TargetIcon,
    color: "bg-green-500",
    gradient: "from-green-400 to-green-500",
    link: "/dashboard/goals",
  },
  {
    title: "Future Self",
    description: "Visualize your dream lifestyle.",
    icon: UsersIcon,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-500",
    link: "/dashboard/future-self",
  },
  {
    title: "Accomplishments",
    description: "Track and celebrate your achievements.",
    icon: CheckCircleIcon,
    color: "bg-yellow-500",
    gradient: "from-yellow-400 to-yellow-500",
    link: "/dashboard/accomplishments",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedQuote = localStorage.getItem("quoteOfTheDay");
    const storedDate = localStorage.getItem("quoteDate");
    const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

    if (storedQuote && storedDate === today) {
      setQuote(JSON.parse(storedQuote));
    } else {
      async function fetchQuote() {
        const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY;
        if (!apiKey) {
          setError("Missing API key: Make sure NEXT_PUBLIC_API_NINJAS_KEY is set in .env.local");
          return;
        }

        try {
          const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: { "X-Api-Key": apiKey },
          });

          if (!response.ok) throw new Error("Failed to fetch quote");

          const data = await response.json();
          const newQuote = data[0];

          localStorage.setItem("quoteOfTheDay", JSON.stringify(newQuote));
          localStorage.setItem("quoteDate", today);
          setQuote(newQuote);
        } catch (error) {
          setError("Failed to load quote. Please try again.");
        }
      }

      fetchQuote();
    }
  }, []);

  const handleLogout = () => {
    router.push("/"); //    Redirect user to home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative">
      
      {/* 🔹 Logout Button (Top Right) */}
      <Button 
        variant="outline"
        onClick={handleLogout}
        className="absolute top-4 right-6 flex items-center gap-2"
      >
        <LogOutIcon className="w-5 h-5" />
        Logout
      </Button>

      {/* Quote Section */}
      <div className="w-full max-w-2xl text-center mb-6">
        <h2 className="text-xl font-semibold text-muted-foreground mb-2">Quote of the Day</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : quote ? (
          <Card className="p-6 shadow-md">
            <p className="text-lg italic">"{quote.quote}"</p>
            <p className="mt-2 text-muted-foreground">- {quote.author}</p>
          </Card>
        ) : (
          <p className="text-muted-foreground">Loading quote...</p>
        )}
      </div>

      {/* Dashboard Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[hsl(var(--foreground))]">LifeMosaic</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Every choice is a brushstroke. Paint the life you imagine.
        </p>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {actions.map((action, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border border-border transition-all duration-300 hover:shadow-md cursor-pointer flex items-center justify-center p-6 h-48"
            onClick={() => router.push(action.link)}
          >
            {/* Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />

            {/* Card Content */}
            <div className="relative flex flex-col items-center text-center text-white">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${action.color}`}>
                <action.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-xl mt-4">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </Card>
        ))}
      </div>
{/* 🔹 Secret Space Mode Button (Bottom Left) */}
<Button 
  variant="ghost" 
  onClick={() => router.push("/nasa-apod")} 
  className="absolute bottom-6 right-6 text-xl p-2"
>
  🌌
</Button>


    </div>
  );
}
