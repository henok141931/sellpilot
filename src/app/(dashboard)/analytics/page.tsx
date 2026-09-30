export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Deep dive into your sales performance.</p>
      </div>

      <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-xl border-slate-200 bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-700 mb-2">Coming Soon</h2>
          <p className="text-slate-500">
            Advanced analytics, conversion rates by industry, and outreach performance metrics will be available here soon. For now, check the Dashboard for your pipeline overview.
          </p>
        </div>
      </div>
    </div>
  );
}
