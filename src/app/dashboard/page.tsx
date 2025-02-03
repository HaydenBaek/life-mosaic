"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { BookOpenIcon, TargetIcon, UsersIcon, CheckCircleIcon } from "lucide-react";

const actions = [
  {
    title: "Diary",
    description: "Write down your thoughts and experiences.",
    icon: BookOpenIcon,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-500",
    link: "/dashboard/diary",
  },
  {
    title: "Goal Setting",
    description: "Set goals with an image URL & price.",
    icon: TargetIcon,
    color: "bg-green-500",
    gradient: "from-green-400 to-green-500",
    link: "/dashboard/goals",
  },
  {
    title: "Future Self",
    description: "Visualize your dream lifestyle.",
    icon: UsersIcon,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-500",
    link: "/dashboard/future-self",
  },
  {
    title: "Accomplishments",
    description: "Track and celebrate your achievements.",
    icon: CheckCircleIcon,
    color: "bg-yellow-500",
    gradient: "from-yellow-400 to-yellow-500",
    link: "/dashboard/accomplishments",
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Dashboard Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[hsl(var(--foreground))]">LifeMosaic Dashboard</h1>
        <p className="text-muted-foreground text-lg mt-2">Plan, track, and visualize your journey.</p>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {actions.map((action, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border border-border transition-all duration-300 hover:shadow-md cursor-pointer flex items-center justify-center p-6 h-48"
            onClick={() => router.push(action.link)}
          >
            {/* Softer Hover Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-80 group-hover:opacity-90 transition-opacity`}
            />

            {/* Card Content */}
            <div className="relative flex flex-col items-center text-center text-white">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${action.color}`}>
                <action.icon className="h-8 w-8 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="font-semibold text-xl mt-4">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
