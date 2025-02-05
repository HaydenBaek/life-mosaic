"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FutureSelfPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const [fields, setFields] = useState<{ [key: string]: string }>({
    career: "",
    ultimateGoal: "",
    house1: "",
    house2: "",
    car1: "",
    car2: "",
    boat: "",
    hobby1: "",
    hobby2: "",
    hobby3: "",
    hobby4: "",
    pet1: "",
    pet2: "",
  });
  

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ Fetch user_id from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
  
    const fetchFutureSelf = async () => {
      try {
        const res = await fetch(`/api/future-self?user_id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch future self");
  
        const data = await res.json();
        console.log("📌 Future Self Data fetched:", data); // ✅ Debugging
  
        if (data) {
          setFields({
            career: data.career_url || "",
            ultimateGoal: data.ultimate_goal_url || "",
            house1: data.house1_url || "",
            house2: data.house2_url || "",
            car1: data.car1_url || "",
            car2: data.car2_url || "",
            boat: data.boat_url || "",
            hobby1: data.hobby1_url || "",
            hobby2: data.hobby2_url || "",
            hobby3: data.hobby3_url || "",
            hobby4: data.hobby4_url || "",
            pet1: data.pet1_url || "",
            pet2: data.pet2_url || "",
          });
        } else {
          console.warn("⚠️ No future self data found.");
        }
      } catch (error) {
        console.error("❌ Failed to load future self data:", error);
      }
    };
  
    fetchFutureSelf();
  }, [userId]);
  
  


  const handleSave = async () => {
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/future-self", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, ...fields }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess("Future Self saved successfully!");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleDeleteImage = async (field: string) => {
    if (!userId) return;

    try {
      const res = await fetch("/api/future-self", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, field }),
      });

      if (res.ok) {
        setFields((prev) => ({ ...prev, [field]: "" }));
      }
    } catch {
      console.error("Failed to delete image.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8">
    
    <Button variant="outline" className="absolute top-4 left-4" onClick={() => router.push("/dashboard")}>
       Back to Dashboard
    </Button>
  
    <h2 className="text-3xl font-semibold mb-6">Customize Your Future Self</h2>
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
    
      <div className="space-y-6">
       
        <div className="flex gap-6">
          {["house1", "house2"].map((key) => (
            <Card 
              key={key} 
              className="w-1/2 p-6 flex flex-col items-center justify-center border h-64 relative"
              onMouseEnter={() => setHoveredField(key)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => handleDeleteImage(key)}
            >
              {fields[key] ? (
                <>
                  <img src={fields[key]} alt={key} className="w-full h-full object-cover rounded" />
                  {hoveredField === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      Click to change image
                    </div>
                  )}
                </>
              ) : (
                <Input placeholder={`${key} URL`} onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))} />
              )}
            </Card>
          ))}
        </div>
  
     
        <div className="flex gap-6">
          {["car1", "car2"].map((key) => (
            <Card 
              key={key} 
              className="w-1/2 p-6 flex flex-col items-center justify-center border h-48 relative"
              onMouseEnter={() => setHoveredField(key)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => handleDeleteImage(key)}
            >
              {fields[key] ? (
                <>
                  <img src={fields[key]} alt={key} className="w-full h-full object-cover rounded" />
                  {hoveredField === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      Click to change image
                    </div>
                  )}
                </>
              ) : (
                <Input placeholder={`${key} URL`} onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))} />
              )}
            </Card>
          ))}
        </div>
  
      
        <Card 
          className="p-6 flex flex-col items-center justify-center border h-72 w-full relative"
          onMouseEnter={() => setHoveredField("boat")}
          onMouseLeave={() => setHoveredField(null)}
          onClick={() => handleDeleteImage("boat")}
        >
          {fields.boat ? (
            <>
              <img src={fields.boat} alt="Boat" className="w-full h-full object-cover rounded" />
              {hoveredField === "boat" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  Click to change image
                </div>
              )}
            </>
          ) : (
            <Input placeholder="Boat URL" onChange={(e) => setFields((prev) => ({ ...prev, boat: e.target.value }))} />
          )}
        </Card>
      </div>
  
      
      <div className="space-y-6">
        
        <div className="flex gap-6">
          {["career", "ultimateGoal"].map((key) => (
            <Card 
              key={key} 
              className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border relative"
              onMouseEnter={() => setHoveredField(key)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => handleDeleteImage(key)}
            >
              {fields[key] ? (
                <>
                  <img src={fields[key]} alt={key} className="w-full h-full object-cover rounded" />
                  {hoveredField === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      Click to change image
                    </div>
                  )}
                </>
              ) : (
                <Input placeholder={`${key} URL`} onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))} />
              )}
            </Card>
          ))}
        </div>
  
       
        <div className="flex gap-6">
          {["hobby1", "hobby2"].map((key) => (
            <Card 
              key={key} 
              className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border relative"
              onMouseEnter={() => setHoveredField(key)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => handleDeleteImage(key)}
            >
              {fields[key] ? (
                <>
                  <img src={fields[key]} alt={key} className="w-full h-full object-cover rounded" />
                  {hoveredField === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      Click to change image
                    </div>
                  )}
                </>
              ) : (
                <Input placeholder={`${key} URL`} onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))} />
              )}
            </Card>
          ))}
        </div>
  
        <div className="flex gap-6">
          {["hobby3", "hobby4"].map((key) => (
            <Card 
              key={key} 
              className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border relative"
              onMouseEnter={() => setHoveredField(key)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => handleDeleteImage(key)}
            >
              {fields[key] ? (
                <>
                  <img src={fields[key]} alt={key} className="w-full h-full object-cover rounded" />
                  {hoveredField === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      Click to change image
                    </div>
                  )}
                </>
              ) : (
                <Input placeholder={`${key} URL`} onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))} />
              )}
            </Card>
          ))}
        </div>
  
        
        <div className="flex gap-6">
          {["pet1", "pet2"].map((key) => (
            <Card 
              key={key} 
              className="w-1/2 h-60 p-4 flex flex-col items-center justify-center border relative"
              onMouseEnter={() => setHoveredField(key)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => handleDeleteImage(key)}
            >
              {fields[key] ? (
                <>
                  <img src={fields[key]} alt={key} className="w-full h-full object-cover rounded" />
                  {hoveredField === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      Click to change image
                    </div>
                  )}
                </>
              ) : (
                <Input placeholder={`${key} URL`} onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))} />
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  
   
    <div className="mt-6 flex gap-4">
      <Button className = "w-full" onClick={handleSave}>Save Future Self</Button>
    </div>
  </div>
  
  );
  
  
  
}
