import { getProspects } from "@/app/actions/prospects";
import { OutreachForm } from "@/components/outreach/OutreachForm";

export default async function OutreachPage({ searchParams }: { searchParams: { prospectId?: string } }) {
  const prospects = await getProspects();

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Outreach Generator</h1>
        <p className="text-slate-500 mt-1">Generate personalized messages based on AI research.</p>
      </div>

      <OutreachForm prospects={prospects} initialProspectId={searchParams.prospectId} />
    </div>
  );
}
