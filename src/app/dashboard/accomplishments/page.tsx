"use client";

import { useState } from "react";
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

  const addAccomplishment = () => {
    if (!newTitle || !newDescription || !selectedDate) return;
    
    const newAccomplishment: Accomplishment = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      date: format(selectedDate, "yyyy-MM-dd"),
    };

    setAccomplishments([...accomplishments, newAccomplishment]);
    setNewTitle("");
    setNewDescription("");
    setSelectedDate(new Date());
  };

  const removeAccomplishment = (id: number) => {
    setAccomplishments(accomplishments.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-semibold text-[hsl(var(--foreground))]">Accomplishments</h2>
        <p className="text-muted-foreground text-lg mt-2">
          Track and celebrate your achievements over time.
        </p>
      </div>

      {/* Input Fields */}
      <div className="w-full max-w-lg mb-6">
        <Input 
          placeholder="Accomplishment Title" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          className="mb-4"
        />
        <Textarea 
          placeholder="Describe your accomplishment..." 
          value={newDescription} 
          onChange={(e) => setNewDescription(e.target.value)} 
          className="mb-4"
        />

        {/* Date Picker */}
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

        <Button onClick={addAccomplishment} className="w-full mt-4">
          Add Accomplishment
        </Button>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-2xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

        {/* Instruction Card */}
        {accomplishments.length === 0 && (
          <div className="flex justify-center relative mb-6">
            <Card className="p-4 w-80 shadow-lg border text-center">
              <h3 className="font-semibold text-lg">How Accomplishments Work</h3>
              <p className="text-sm text-muted-foreground">
                Add accomplishments using the form above. Your achievements will be displayed in a timeline.
              </p>
            </Card>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
          </div>
        )}

        {/* Accomplishment Cards */}
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
              {/* Connector Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <Button variant="outline" className="mt-6" onClick={() => router.push("/dashboard")}>
        Back to Dashboard
      </Button>
    </div>
  );
}
