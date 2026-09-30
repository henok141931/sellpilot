'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricing: "",
    currency: "USD",
    market: "",
    customerType: "",
    problemSolved: "",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save data via server action or API
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[600px]">
      <div className="w-full md:w-1/3 bg-slate-50 border-r p-8">
        <div className="mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Let's get started</h2>
        </div>

        <div className="space-y-6 relative">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>
          {[
            { num: 1, title: "Product setup" },
            { num: 2, title: "Target customer" },
            { num: 3, title: "Sales bottleneck" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-4 relative z-10">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= s.num
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`font-medium ${
                  step >= s.num ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col">
        <div className="flex-1">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">What do you sell?</h3>
                <p className="text-slate-500 mt-1">Tell us about your product or service.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    placeholder="e.g. QR Menu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border rounded-md h-24"
                    placeholder="e.g. Digital menu system for restaurants."
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pricing</label>
                    <input
                      type="text"
                      value={formData.pricing}
                      onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                      className="w-full p-3 border rounded-md"
                      placeholder="e.g. 500"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full p-3 border rounded-md bg-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="ETB">ETB</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">What kind of customers are you looking for?</h3>
                <p className="text-slate-500 mt-1">Define your Ideal Customer Profile (ICP).</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location / Market</label>
                  <input
                    type="text"
                    value={formData.market}
                    onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    placeholder="e.g. Ethiopia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current customer type</label>
                  <input
                    type="text"
                    value={formData.customerType}
                    onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    placeholder="e.g. Restaurants and cafes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Main problem solved</label>
                  <textarea
                    value={formData.problemSolved}
                    onChange={(e) => setFormData({ ...formData, problemSolved: e.target.value })}
                    className="w-full p-3 border rounded-md h-24"
                    placeholder="e.g. Need to reprint menus constantly."
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">What's your biggest sales problem?</h3>
                <p className="text-slate-500 mt-1">This helps us personalize your dashboard.</p>
              </div>
              <div className="space-y-3">
                {[
                  "I don't know who to contact",
                  "I don't get enough leads",
                  "People don't respond",
                  "People respond but don't buy",
                  "My pricing gets rejected",
                  "I don't know why I'm not converting",
                  "I don't have a repeatable sales process"
                ].map((problem) => (
                  <label
                    key={problem}
                    className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input type="radio" name="salesProblem" className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-700 font-medium">{problem}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {step === 3 ? "Complete setup" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
