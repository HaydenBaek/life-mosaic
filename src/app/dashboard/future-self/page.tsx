"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FutureSelfPage() {
  const router = useRouter();

  // for left side
  const [house1, setHouse1] = useState("");
  const [house2, setHouse2] = useState("");
  const [car1, setCar1] = useState("");
  const [car2, setCar2] = useState("");
  const [boat, setBoat] = useState("");

  // for right side
  const [career, setCareer] = useState("");
  const [ultimateGoal, setUltimateGoal] = useState(""); 
  const [hobby1, setHobby1] = useState("");
  const [hobby2, setHobby2] = useState("");
  const [hobby3, setHobby3] = useState("");
  const [hobby4, setHobby4] = useState("");
  const [pet1, setPet1] = useState("");
  const [pet2, setPet2] = useState("");

  const handleSave = () => {
    alert("Future Self saved! (Database integration needed)");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-3xl font-semibold mb-6">Customize Your Future Self</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* Left Side: Dream Life */}
        <div className="space-y-6">
          {/* Houses */}
          <div className="flex gap-6">
            <Card className="w-1/2 p-6 flex flex-col items-center justify-center border h-56">
              {house1 ? <img src={house1} alt="House 1" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="House 1 URL" onChange={(e) => setHouse1(e.target.value)} />}
            </Card>
            <Card className="w-1/2 p-6 flex flex-col items-center justify-center border h-56">
              {house2 ? <img src={house2} alt="House 2" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="House 2 URL" onChange={(e) => setHouse2(e.target.value)} />}
            </Card>
          </div>

          {/* Cars */}
          <div className="flex gap-6">
            <Card className="w-1/2 p-6 flex flex-col items-center justify-center border h-40">
              {car1 ? <img src={car1} alt="Car 1" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Car 1 URL" onChange={(e) => setCar1(e.target.value)} />}
            </Card>
            <Card className="w-1/2 p-6 flex flex-col items-center justify-center border h-40">
              {car2 ? <img src={car2} alt="Car 2" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Car 2 URL" onChange={(e) => setCar2(e.target.value)} />}
            </Card>
          </div>

          {/* Boat */}
          <Card className="p-6 flex flex-col items-center justify-center border h-44">
            {boat ? <img src={boat} alt="Boat" className="w-full h-full object-cover rounded" /> : 
            <Input placeholder="Boat URL" onChange={(e) => setBoat(e.target.value)} />}
          </Card>
        </div>

        {/* Right Side: Future Identity */}
        <div className="space-y-6">
          {/* Career & Ultimate Goal */}
          <div className="flex gap-6">
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {career ? <img src={career} alt="Career" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Career URL" onChange={(e) => setCareer(e.target.value)} />}
            </Card>
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {ultimateGoal ? <img src={ultimateGoal} alt="Ultimate Goal" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Ultimate Goal URL" onChange={(e) => setUltimateGoal(e.target.value)} />}
            </Card>
          </div>

          {/* Hobbies */}
          <div className="flex gap-6">
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {hobby1 ? <img src={hobby1} alt="Hobby 1" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Hobby 1 URL" onChange={(e) => setHobby1(e.target.value)} />}
            </Card>
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {hobby2 ? <img src={hobby2} alt="Hobby 2" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Hobby 2 URL" onChange={(e) => setHobby2(e.target.value)} />}
            </Card>
          </div>

          <div className="flex gap-6">
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {hobby3 ? <img src={hobby3} alt="Hobby 3" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Hobby 3 URL" onChange={(e) => setHobby3(e.target.value)} />}
            </Card>
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {hobby4 ? <img src={hobby4} alt="Hobby 4" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Hobby 4 URL" onChange={(e) => setHobby4(e.target.value)} />}
            </Card>
          </div>

          {/* Pets */}
          <div className="flex gap-6">
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {pet1 ? <img src={pet1} alt="Pet 1" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Pet 1 URL" onChange={(e) => setPet1(e.target.value)} />}
            </Card>
            <Card className="w-1/2 h-40 p-4 flex flex-col items-center justify-center border">
              {pet2 ? <img src={pet2} alt="Pet 2" className="w-full h-full object-cover rounded" /> : 
              <Input placeholder="Pet 2 URL" onChange={(e) => setPet2(e.target.value)} />}
            </Card>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Back
        </Button>
        <Button onClick={handleSave}>Save Future Self</Button>
      </div>
    </div>
  );
}
