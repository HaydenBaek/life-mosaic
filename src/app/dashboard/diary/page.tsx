"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type DiaryEntry = {
  id: number;
  entry_date: string;
  content: string;
};

export default function DiaryPage() {
  const router = useRouter();
  const [entry, setEntry] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
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

    const fetchEntries = async () => {
      try {
        const res = await fetch(`/api/diary?user_id=${userId}`);
        const data = await res.json();
        if (res.ok) setDiaryEntries(data);
        else setError(data.error);
      } catch {
        setError("Failed to load diary entries.");
      }
    };

    fetchEntries();
  }, [userId]);

  const handleSave = async () => {
    if (!selectedDate || !entry.trim()) {
      setError("Please select a date and enter some text.");
      return;
    }
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          content: entry,
          entry_date: format(selectedDate, "yyyy-MM-dd"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess("Diary entry saved successfully!");
      setEntry("");
      setSelectedDate(new Date());

      setDiaryEntries([{ id: Date.now(), entry_date: format(selectedDate, "yyyy-MM-dd"), content: entry }, ...diaryEntries]);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/diary", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, user_id: userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete entry.");
      }

      setDiaryEntries(diaryEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      setError("Could not delete entry.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative">

      <Button
        variant="outline"
        className="absolute top-4 left-4"
        onClick={() => router.push("/dashboard")}
      >
        ← Back to Dashboard
      </Button>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">Diary</h2>
        <p className="text-muted-foreground text-lg mt-2">
          Capture your thoughts and moments.
        </p>
      </div>

      <Card className="p-6 w-full max-w-lg">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
            <Calendar selected={selectedDate} onChange={setSelectedDate} />

            </PopoverContent>
          </Popover>
        </div>

        <Textarea
          placeholder="Write your thoughts here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="h-40"
        />

        <div className="mt-4">
          <Button onClick={handleSave} className="w-full">Save</Button>
        </div>
      </Card>

      <div className="mt-10 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">Your Entries</h3>
        {diaryEntries.length === 0 ? (
          <p className="text-muted-foreground">No entries yet.</p>
        ) : (
          <div className="space-y-4">
            {diaryEntries.map((entry) => (
              <Card key={entry.id} className="p-4 border flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{format(new Date(entry.entry_date), "PPP")}</p>
                  <p className="text-md mt-2">{entry.content}</p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(entry.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
