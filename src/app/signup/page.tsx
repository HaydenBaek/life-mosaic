"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react"; // ✅ Correct icons

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // ✅ Fix error type
  const [success, setSuccess] = useState<string | null>(null); // ✅ Fix success type

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error
    setSuccess(null); // Reset success

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("📌 Signup Response:", data);

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/"), 2000); // ✅ Redirect after 2 seconds
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>

        {error && (
          <Alert variant="destructive" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
            <div>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            <div>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
              Back to Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
