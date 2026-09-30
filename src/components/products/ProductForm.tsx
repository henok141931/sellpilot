'use client'

import { useState } from "react";
import { Sparkles, Save, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProduct } from "@/app/actions/products";
import { improveProductPositioning } from "@/app/actions/ai";

export function ProductForm({ initialProduct }: { initialProduct: any }) {
  const [formData, setFormData] = useState({
    name: initialProduct.name || "",
    website: initialProduct.website || "",
    description: initialProduct.description || "",
    problemSolved: initialProduct.problemSolved || "",
    market: initialProduct.market || "",
    pricing: initialProduct.pricing || ""
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProduct(initialProduct.id, formData);
      alert("Product profile saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImprove = async () => {
    if (!formData.description) return alert("Please enter a description first.");
    setIsImproving(true);
    try {
      const improved = await improveProductPositioning(formData.description);
      setFormData(prev => ({ ...prev, description: improved || prev.description }));
    } catch (err) {
      console.error(err);
      alert("Failed to improve positioning.");
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Product Profile</h1>
          <p className="text-slate-500 mt-1">Define what you are selling and who you are selling it to.</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Core Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="e.g. SellPilot" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input id="website" placeholder="https://" value={formData.website} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Elevator Pitch / Description</Label>
                  <Button variant="ghost" size="sm" className="h-8 gap-2 text-blue-600 hover:text-blue-700" onClick={handleImprove} disabled={isImproving}>
                    {isImproving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    Improve Positioning
                  </Button>
                </div>
                <Textarea 
                  id="description" 
                  placeholder="What does your product do? AI can help you refine this..." 
                  className="min-h-[120px]"
                  value={formData.description} 
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target Market (ICP)</CardTitle>
              <CardDescription>Who are your best customers?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="market">Target Audience</Label>
                <Input id="market" placeholder="e.g. Marketing agencies with 10-50 employees" value={formData.market} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="problemSolved">Primary Value Proposition</Label>
                <Input id="problemSolved" placeholder="e.g. Saves 10 hours a week on reporting" value={formData.problemSolved} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricing">Average Deal Size / Pricing</Label>
                <Input id="pricing" placeholder="e.g. $99/mo or $5,000 one-time" value={formData.pricing} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
