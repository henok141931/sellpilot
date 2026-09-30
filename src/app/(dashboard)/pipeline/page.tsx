import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProspects } from "@/app/actions/prospects";

const stages = ["NEW", "CONTACTED", "REPLIED", "INTERESTED", "DEMO", "PROPOSAL", "WON", "LOST"];

export default async function PipelinePage() {
  const prospects = await getProspects();

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sales Pipeline</h1>
        <p className="text-slate-500 mt-1">Track and manage your prospects through the funnel.</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex h-full gap-4 min-w-max">
          {stages.map((stage) => {
            const columnCards = prospects.filter((c) => c.status === stage);
            return (
              <div key={stage} className="w-80 flex flex-col bg-slate-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-bold text-slate-700">{stage}</h3>
                  <span className="text-sm font-medium text-slate-500">
                    {columnCards.length}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                  {columnCards.map((card) => (
                    <Card key={card.id} className="cursor-pointer hover:border-blue-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-slate-900">{card.companyName}</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {card.icpScore || 0}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">{card.industry}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
