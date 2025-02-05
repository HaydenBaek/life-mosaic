"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Goal = {
  id: number;
  goal_name: string;
  image_url: string;
  price: number;
};

export default function GoalsPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [goalName, setGoalName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [completedGoal, setCompletedGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.id) {
          setUserId(user.id);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchGoals = async () => {
      try {
        const res = await fetch(`/api/goals?user_id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch goals");
        const data = await res.json();
        setGoals(data || []);
      } catch (error) {
        console.error("Failed to load goals:", error);
      }
    };

    fetchGoals();
  }, [userId]);

  const handleAddGoal = async () => {
    if (!goalName.trim() || !imageUrl.trim() || !price.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          goal_name: goalName,
          image_url: imageUrl,
          price: parseFloat(price),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setGoals([{ id: Date.now(), goal_name: goalName, image_url: imageUrl, price: parseFloat(price) }, ...goals]);
      setGoalName("");
      setImageUrl("");
      setPrice("");
    } catch {
      console.error("Failed to add goal.");
    }
  };

  const handleAchieveGoal = async (goal: Goal) => {
    if (!userId) {
      console.error("User ID is missing. Cannot delete goal.");
      return;
    }

    try {
      const res = await fetch("/api/goals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: goal.id, user_id: userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to delete goal:", data.error || "Unknown error");
        return;
      }

      setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goal.id));
      setCompletedGoal(goal);
      setShowDialog(true);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 relative">
      <Button variant="outline" className="absolute top-4 left-4" onClick={() => router.push("/dashboard")}>
        ← Back to Dashboard
      </Button>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">Goal Setting</h2>
        <p className="text-muted-foreground text-lg mt-2">Set, view, and achieve your goals.</p>
      </div>

      <Card className="p-6 w-full max-w-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add a New Goal</h3>
        <Input placeholder="Enter goal name" value={goalName} onChange={(e) => setGoalName(e.target.value)} className="mb-3" />
        <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mb-3" />
        <Input placeholder="Price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mb-3" />
        <Button className="w-full" onClick={handleAddGoal}>Add Goal</Button>
      </Card>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {goals.length === 0 ? (
          <p className="text-muted-foreground">No active goals yet.</p>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id} className="p-4 border w-60">
              <p className="text-md font-semibold">{goal.goal_name}</p>
              <p className="text-sm text-gray-500">Price: ${goal.price}</p>
              <img src={goal.image_url} alt={goal.goal_name} className="w-full h-32 object-cover mt-2 rounded" />
              <Button className="mt-2 w-full" onClick={() => handleAchieveGoal(goal)}>Achieve Goal</Button>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
          </DialogHeader>
          {completedGoal && (
            <>
              <p>You achieved: <strong>{completedGoal.goal_name}</strong>.</p>
              <p>Would you like to record this in your diary or accomplishments?</p>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setShowDialog(false)}>Close</Button>
                <Button onClick={() => router.push("/dashboard/diary")}>Record in Diary</Button>
                <Button onClick={() => router.push("/dashboard/accomplishments")}>Record in Accomplishments</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
