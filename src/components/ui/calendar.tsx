"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  selected: Date | null
  onChange: (date: Date | null) => void
  className?: string
}

function Calendar({ selected, onChange, className }: CalendarProps) {
  return (
    <div className={cn("relative p-3", className)}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className="border p-2 rounded w-full text-center"
      />
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <ChevronLeft className="h-4 w-4 text-gray-500" />
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <ChevronRight className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
