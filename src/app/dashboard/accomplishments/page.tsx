"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type Accomplishment = {
  id: number;
  title: string;
  description: string;
  date: string;
};

export default function AccomplishmentsPage() {
  const router = useRouter();
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchAccomplishments = async () => {
      try {
        const res = await fetch(`/api/accomplishments?user_id=${userId}`);
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        const formattedData: Accomplishment[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          date: item.achievement_date,
        }));

        setAccomplishments(formattedData);
      } catch (error) {
        setError("Failed to load accomplishments.");
      }
    };

    fetchAccomplishments();
  }, [userId]);

  const addAccomplishment = async () => {
    if (!newTitle || !newDescription || !selectedDate) {
      setError("All fields are required.");
      return;
    }
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    setError(null);
    setSuccess(null);

    const newAccomplishment = {
      user_id: userId,
      title: newTitle,
      description: newDescription,
      achievement_date: format(selectedDate, "yyyy-MM-dd"),
    };

    try {
      const res = await fetch("/api/accomplishments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccomplishment),
      });

      if (!res.ok) {
        throw new Error("Failed to save accomplishment.");
      }

      setSuccess("Accomplishment saved successfully!");
      setAccomplishments([
        { id: Date.now(), title: newTitle, description: newDescription, date: format(selectedDate, "yyyy-MM-dd") },
        ...accomplishments,
      ]);

      setNewTitle("");
      setNewDescription("");
      setSelectedDate(new Date());
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const removeAccomplishment = async (id: number) => {
    try {
      const res = await fetch("/api/accomplishments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, user_id: userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete accomplishment.");
      }

      setAccomplishments(accomplishments.filter((item) => item.id !== id));
      setSuccess("Accomplishment deleted successfully!");
    } catch (error) {
      setError("Could not delete accomplishment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative">
      <Button variant="outline" className="absolute top-4 left-4" onClick={() => router.push("/dashboard")}>
        ← Back to Dashboard
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[hsl(var(--foreground))]">Your Personal Achievements</h1>
        <p className="text-muted-foreground text-lg mt-2">Every small win brings you closer to your goals.</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="w-full max-w-lg mb-6">
        <Input placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="mb-4" />
        <Textarea placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="mb-4" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
          </PopoverContent>
        </Popover>

        <Button onClick={addAccomplishment} className="w-full mt-4">
          Add Accomplishment
        </Button>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

        {accomplishments.length === 0 && (
          <div className="flex justify-center relative mb-6">
            <Card className="p-4 w-80 shadow-lg border text-center">
              <h3 className="font-semibold text-lg">How Accomplishments Work</h3>
              <p className="text-sm text-muted-foreground">Add accomplishments above. Your achievements will be displayed in a timeline.</p>
            </Card>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
          </div>
        )}

        <div className="space-y-6">
          {accomplishments.map((item, index) => (
            <div key={item.id} className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} relative`}>
              <Card className="p-4 w-80 shadow-lg border">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">📅 {item.date}</p>
                <Button variant="destructive" size="sm" onClick={() => removeAccomplishment(item.id)} className="mt-2">
                  Remove
                </Button>
              </Card>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
