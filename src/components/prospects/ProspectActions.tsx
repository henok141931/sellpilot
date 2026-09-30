'use client'

import { useState } from "react";
import { Search, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { researchLead } from "@/app/actions/ai";
import { useRouter } from "next/navigation";

export function ProspectActions({ prospectId }: { prospectId: string }) {
  const [isResearching, setIsResearching] = useState(false);
  const router = useRouter();

  const handleResearch = async () => {
    setIsResearching(true);
    try {
      await researchLead(prospectId);
      router.refresh(); // Refresh the page to show new research data
    } catch (error) {
      console.error(error);
      alert("Failed to run research.");
    } finally {
      setIsResearching(false);
    }
  };

  const handleOutreach = () => {
    router.push(`/outreach?prospectId=${prospectId}`);
  };

  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        className="gap-2" 
        onClick={handleResearch} 
        disabled={isResearching}
      >
        {isResearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        {isResearching ? "Researching..." : "Research Lead"}
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={handleOutreach}>
        <Play className="w-4 h-4" />
        Generate Outreach
      </Button>
    </div>
  );
}
