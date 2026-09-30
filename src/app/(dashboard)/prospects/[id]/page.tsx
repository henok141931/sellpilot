import { ArrowLeft, User, Search, CheckCircle2, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProspect } from "@/app/actions/prospects";
import { ProspectActions } from "@/components/prospects/ProspectActions";
import { StatusSelect } from "@/components/prospects/StatusSelect";
import { FollowUpButton } from "@/components/prospects/FollowUpButton";

export default async function ProspectDetailPage({ params }: { params: { id: string } }) {
  const prospect = await getProspect(params.id);

  if (!prospect) {
    return <div>Prospect not found</div>;
  }

  const latestResearch = prospect.research && prospect.research.length > 0 
    ? prospect.research[0] 
    : null;

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <Link href="/prospects" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Prospects
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{prospect.companyName}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {prospect.industry && (
                <>
                  <p className="text-slate-500">{prospect.industry}</p>
                  <span className="text-slate-300">•</span>
                </>
              )}
              {prospect.location && (
                <>
                  <p className="text-slate-500">{prospect.location}</p>
                  <span className="text-slate-300">•</span>
                </>
              )}
              <StatusSelect prospectId={prospect.id} currentStatus={prospect.status} />
              <span className="text-slate-300">•</span>
              <FollowUpButton prospectId={prospect.id} existingFollowUps={prospect.followUps} />
            </div>
          </div>
          <ProspectActions prospectId={prospect.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* AI Insights */}
          <Card className="border-blue-100 bg-blue-50/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-blue-100 bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-900 text-lg">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                AI Insights: Why this lead?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {latestResearch ? (
                <>
                  <p className="text-slate-800 leading-relaxed">
                    {latestResearch.summary}
                  </p>
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-3">Detected Buying Signals</h4>
                    <div className="flex gap-2 flex-wrap">
                      {latestResearch.buyingSignals.map((signal, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white text-blue-700 border-blue-200">
                          {signal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">No AI research has been run for this lead yet.</p>
                  <p className="text-sm text-slate-400">Click "Research Lead" above to analyze this prospect.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {latestResearch && (
                  <div className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">AI Research Completed</p>
                      <p className="text-sm text-slate-500 mt-1">Identified {latestResearch.buyingSignals.length} buying signals.</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(latestResearch.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Prospect Created</p>
                    <p className="text-sm text-slate-500 mt-1">Added to pipeline.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(prospect.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>ICP Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 mb-2">
                <span className={`text-5xl font-extrabold ${prospect.icpScore && prospect.icpScore >= 90 ? 'text-green-600' : 'text-blue-600'}`}>
                  {prospect.icpScore || 0}
                </span>
                <span className="text-xl font-medium text-slate-400 mb-1">/100</span>
              </div>
              <p className={`text-sm font-medium bg-slate-50 px-3 py-1 rounded-full inline-block ${prospect.icpScore && prospect.icpScore >= 90 ? 'text-green-700 bg-green-50' : 'text-blue-700 bg-blue-50'}`}>
                {prospect.icpScore && prospect.icpScore >= 90 ? 'Excellent Fit' : 'Good Fit'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
