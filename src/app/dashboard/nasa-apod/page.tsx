"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function NasaApodPage() {
  const router = useRouter();
  const [apod, setApod] = useState<{ url: string; title: string; explanation: string; media_type: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedApod = localStorage.getItem("nasaApod");
    const storedDate = localStorage.getItem("nasaApodDate");
    const today = new Date().toISOString().split("T")[0];

    if (storedApod && storedDate === today) {
      setApod(JSON.parse(storedApod));
      setLoading(false);
    } else {
      async function fetchApod() {
        try {
          const response = await fetch("/api/nasa"); // 🔥 Fetch from your API route
          if (!response.ok) throw new Error("Failed to fetch NASA APOD");

          const data = await response.json();

          localStorage.setItem("nasaApod", JSON.stringify(data));
          localStorage.setItem("nasaApodDate", today);
          setApod(data);
        } catch (error) {
          setError("Could not load the Astronomy Picture of the Day. Try again later.");
        } finally {
          setLoading(false);
        }
      }

      fetchApod();
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
      
      <div className="fixed inset-0 -z-10">
        <div className="page-bg"></div>
        <div className="animation-wrapper">
          {/* Generate 100 stars dynamically */}
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`particle particle-${(i % 5) + 1}`}
              style={{
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-[hsl(var(--foreground))]">NASA Astronomy Picture of the Day</h1>
      <p className="text-muted-foreground text-lg mt-2 text-center">Discover a new piece of the universe every day.</p>

      {/* Loading & Error Handling */}
      {loading && <p className="mt-6 text-muted-foreground">Loading...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {/* APOD Display */}
      {apod && (
        <Card className="p-6 w-full max-w-2xl mt-6 shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">{apod.title}</h2>

          {apod.media_type === "image" ? (
            <img src={apod.url} alt={apod.title} className="w-full h-auto rounded-md mt-4 shadow-md" />
          ) : (
            <iframe 
              src={apod.url} 
              title={apod.title}
              className="w-full h-96 rounded-md mt-4 shadow-md"
              allowFullScreen
            />
          )}

          <p className="text-sm text-muted-foreground mt-4">{apod.explanation}</p>
        </Card>
      )}

      {/* Back Button */}
      <Button 
        variant="outline" 
        className="mt-6 flex items-center gap-2"
        onClick={() => router.back()} 
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </Button>

    </div>
  );
}
