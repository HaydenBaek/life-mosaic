"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GoalsPage() {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");

  const handleSetGoal = () => {
    if (!goal.trim() || !imageURL.trim() || !price) {
      alert("Please fill out all fields.");
      return;
    }
    alert(`Goal set: ${goal} ($${price})! (Database integration needed)`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">Goal Setting</h2>
        <p className="text-muted-foreground text-lg mt-2">
          Set your goals and track your progress!
        </p>
      </div>

      <Card className="p-6 w-full max-w-lg">
        {/* Goal Name */}
        <Input
          placeholder="Enter your goal (e.g., Buy a new laptop)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mb-4"
        />

        {/* Image URL */}
        <Input
          placeholder="Image URL (for visualization)"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="mb-4"
        />

        {/* Price */}
        <Input
          placeholder="Price ($)"
          type="number"
          value={price}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          className="mb-4"
        />

        {/* Image Preview */}
        {imageURL && (
          <img src={imageURL} alt="Goal Preview" className="w-full h-40 object-cover mb-4 rounded" />
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back
          </Button>
          <Button onClick={handleSetGoal}>Set Goal</Button>
        </div>
      </Card>
    </div>
  );
}
