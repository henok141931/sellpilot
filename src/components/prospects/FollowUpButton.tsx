'use client'

import { useState } from "react";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scheduleFollowUp } from "@/app/actions/prospects";

export function FollowUpButton({ prospectId, existingFollowUps = [] }: { prospectId: string, existingFollowUps?: any[] }) {
  const [date, setDate] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  
  const pendingFollowUp = existingFollowUps.find(f => f.status === "PENDING");

  const handleSchedule = async () => {
    if (!date) return;
    setIsScheduling(true);
    try {
      await scheduleFollowUp(prospectId, new Date(date));
      setDate("");
    } catch (e) {
      console.error(e);
      alert("Failed to schedule follow-up.");
    } finally {
      setIsScheduling(false);
    }
  };

  if (pendingFollowUp) {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200">
        <CalendarIcon className="w-4 h-4" />
        Follow-up due: {new Date(pendingFollowUp.dueDate).toLocaleDateString()}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)}
        className="h-9 w-auto text-sm"
        min={new Date().toISOString().split('T')[0]}
      />
      <Button 
        variant="outline" 
        size="sm"
        className="gap-2 h-9" 
        onClick={handleSchedule} 
        disabled={isScheduling || !date}
      >
        {isScheduling ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarIcon className="w-4 h-4" />}
        Schedule
      </Button>
    </div>
  );
}
