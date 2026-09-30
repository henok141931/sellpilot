'use client'

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { updateProspectStatus } from "@/app/actions/prospects";
import { useRouter } from "next/navigation";

const stages = ["NEW", "CONTACTED", "REPLIED", "INTERESTED", "DEMO", "PROPOSAL", "WON", "LOST"];

export function StatusSelect({ prospectId, currentStatus }: { prospectId: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;
    
    setIsUpdating(true);
    try {
      await updateProspectStatus(prospectId, newStatus);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isUpdating && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
      <select 
        className="text-sm font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full outline-none focus:ring-2 focus:ring-blue-500 border-none appearance-none cursor-pointer"
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isUpdating}
      >
        {stages.map(stage => (
          <option key={stage} value={stage}>{stage}</option>
        ))}
      </select>
    </div>
  );
}
