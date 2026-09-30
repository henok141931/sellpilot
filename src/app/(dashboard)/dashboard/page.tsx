import { getProspects } from "@/app/actions/prospects";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const prospects = await getProspects();
  
  const total = prospects.length;
  const contacted = prospects.filter(p => p.status !== 'NEW').length;
  const replies = prospects.filter(p => ['REPLIED', 'INTERESTED', 'DEMO', 'PROPOSAL', 'WON'].includes(p.status)).length;
  const interested = prospects.filter(p => ['INTERESTED', 'DEMO', 'PROPOSAL', 'WON'].includes(p.status)).length;
  const demos = prospects.filter(p => ['DEMO', 'PROPOSAL', 'WON'].includes(p.status)).length;
  const won = prospects.filter(p => p.status === 'WON').length;
  
  const highFit = prospects.filter(p => (p.icpScore || 0) >= 90).length;
  
  const pendingFollowUpsCount = prospects.reduce((acc, p) => acc + (p.followUps?.length || 0), 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Good morning</h1>
        <p className="text-slate-500 mt-1">Here's what needs your attention today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h3 className="font-medium text-slate-600">Total Prospects</h3>
          <p className="text-3xl font-bold mt-2">{total}</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h3 className="font-medium text-slate-600">Follow-ups Due</h3>
          <p className="text-3xl font-bold mt-2 text-amber-600">{pendingFollowUpsCount}</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h3 className="font-medium text-slate-600">High-fit prospects</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">{highFit}</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h3 className="font-medium text-slate-600">Active Deals</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">{interested}</p>
        </div>
      </div>

      <div className="p-8 bg-white border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Pipeline Overview</h2>
        <div className="flex items-center justify-between text-center border p-6 rounded-lg bg-slate-50">
          <div>
            <p className="text-2xl font-bold text-blue-600">{total}</p>
            <p className="text-sm font-medium text-slate-600">Prospects</p>
          </div>
          <div className="text-slate-300">→</div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{contacted}</p>
            <p className="text-sm font-medium text-slate-600">Contacted</p>
          </div>
          <div className="text-slate-300">→</div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{replies}</p>
            <p className="text-sm font-medium text-slate-600">Replies</p>
          </div>
          <div className="text-slate-300">→</div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{interested}</p>
            <p className="text-sm font-medium text-slate-600">Interested</p>
          </div>
          <div className="text-slate-300">→</div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{demos}</p>
            <p className="text-sm font-medium text-slate-600">Demos</p>
          </div>
          <div className="text-slate-300">→</div>
          <div>
            <p className="text-2xl font-bold text-green-600">{won}</p>
            <p className="text-sm font-medium text-slate-600">Won</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Link href="/diagnosis">
            <Button variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
              Run AI Diagnosis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
