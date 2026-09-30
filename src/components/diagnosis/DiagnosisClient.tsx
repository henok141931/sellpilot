'use client'

import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { diagnoseFunnel } from "@/app/actions/ai";

export function DiagnosisClient() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const data = await diagnoseFunnel();
      setReport(data);
    } catch (e) {
      console.error(e);
      alert("Failed to run analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sales Diagnosis</h1>
          <p className="text-slate-500 mt-1">AI-powered analysis of your funnel performance.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={handleAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
          {isAnalyzing ? "Analyzing..." : "Run New Analysis"}
        </Button>
      </div>

      {!report && !isAnalyzing && (
        <div className="text-center py-12 border-2 border-dashed rounded-xl border-slate-200">
          <p className="text-slate-500">No recent analysis found. Click "Run New Analysis" to start.</p>
        </div>
      )}

      {report && (
        <div className="space-y-6">
          <Card className="border-red-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <CardHeader className="bg-red-50/50 border-b border-red-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-red-900">Primary Bottleneck: {report.bottleneck}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Observation</h4>
                <p className="text-slate-700">{report.observation}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Recommendation</h4>
                <p className="text-slate-700">{report.recommendation}</p>
              </div>
            </CardContent>
          </Card>

          {report.healthyMetric && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Healthy Metric: {report.healthyMetric}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{report.healthyReason}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
