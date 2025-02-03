"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function DiaryPage() {
  const router = useRouter();
  const [entry, setEntry] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSave = () => {
    if (!selectedDate || !entry.trim()) {
      alert("Please select a date and enter some text.");
      return;
    }

    alert(`Diary entry saved for ${format(selectedDate, "PPP")}! (Database integration needed)`);
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
    </div>
  );
}
