'use client'

import { useState } from "react";
import { Sparkles, Send, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { generateOutreach } from "@/app/actions/ai";

export function OutreachForm({ prospects, initialProspectId }: { prospects: any[], initialProspectId?: string }) {
  const [prospectId, setProspectId] = useState(initialProspectId || (prospects.length > 0 ? prospects[0].id : ""));
  const [channel, setChannel] = useState("Email");
  const [objective, setObjective] = useState("Cold Introduction");
  const [tone, setTone] = useState("Professional");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prospectId) return;
    setIsGenerating(true);
    try {
      const generated = await generateOutreach(prospectId, channel, tone, objective);
      setVariants(generated);
    } catch (error) {
      console.error(error);
      alert("Failed to generate outreach.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Prospect</Label>
              <select 
                className="w-full p-2 border rounded-md mt-1 bg-white"
                value={prospectId}
                onChange={(e) => setProspectId(e.target.value)}
              >
                {prospects.map(p => (
                  <option key={p.id} value={p.id}>{p.companyName}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label>Channel</Label>
              <select 
                className="w-full p-2 border rounded-md mt-1 bg-white"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
              >
                <option>Email</option>
                <option>LinkedIn</option>
                <option>Instagram DM</option>
                <option>WhatsApp</option>
              </select>
            </div>

            <div>
              <Label>Objective</Label>
              <select 
                className="w-full p-2 border rounded-md mt-1 bg-white"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
              >
                <option>Cold Introduction</option>
                <option>Follow-up</option>
                <option>Demo Invitation</option>
              </select>
            </div>

            <div>
              <Label>Tone</Label>
              <select 
                className="w-full p-2 border rounded-md mt-1 bg-white"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Direct</option>
                <option>Casual</option>
              </select>
            </div>

            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 gap-2"
              onClick={handleGenerate}
              disabled={isGenerating || !prospectId}
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Generating..." : "Generate Variants"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Generated Messages</h2>
        
        {variants.length === 0 && !isGenerating && (
          <div className="text-center py-12 border-2 border-dashed rounded-xl border-slate-200">
            <p className="text-slate-500">Select a prospect and generate messages to see them here.</p>
          </div>
        )}

        {variants.map((variant, index) => (
          <Card key={index} className="relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Variant {index + 1}</CardTitle>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="h-8 gap-2" onClick={() => navigator.clipboard.writeText(variant)}>
                    <Copy className="w-3 h-3" /> Copy
                  </Button>
                  <Button size="sm" className="h-8 gap-2 bg-blue-600">
                    <Send className="w-3 h-3" /> Mark as Sent
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-slate-800 whitespace-pre-wrap">{variant}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
