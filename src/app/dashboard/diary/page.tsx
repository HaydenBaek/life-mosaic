"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [userId, setUserId] = useState<number | null>(null); // Store user_id

  // ✅ Fetch user_id from localStorage (Assuming it's stored after login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    }
  }, []);

  // ✅ Fetch diary entries **ONLY for the logged-in user**
  useEffect(() => {
    if (!userId) return; // Ensure user ID is set before fetching

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
  }, [userId]); // Run when userId is set

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

      // ✅ Refresh the diary entries list
      setDiaryEntries([{ id: Date.now(), entry_date: format(selectedDate, "yyyy-MM-dd"), content: entry }, ...diaryEntries]);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">Diary</h2>
        <p className="text-muted-foreground text-lg mt-2">
          Capture your thoughts and moments.
        </p>
      </div>

      <Card className="p-6 w-full max-w-lg">
        {/* Alerts */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Date Picker */}
        <div className="mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Diary Entry Textarea */}
        <Textarea
          placeholder="Write your thoughts here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="h-40"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Card>

      {/* ✅ Display Diary Entries for Logged-in User */}
      <div className="mt-10 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">Your Entries</h3>
        {diaryEntries.length === 0 ? (
          <p className="text-muted-foreground">No entries yet.</p>
        ) : (
          <div className="space-y-4">
            {diaryEntries.map((entry) => (
              <Card key={entry.id} className="p-4 border">
                <p className="text-sm text-gray-500">{format(new Date(entry.entry_date), "PPP")}</p>
                <p className="text-md mt-2">{entry.content}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
