import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="px-6 lg:px-14 py-6 flex items-center justify-between border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl text-slate-900">SellPilot</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Sign In
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 lg:px-14 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            You built the product. <br className="hidden lg:block" /> Now sell it.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            SellPilot helps freelancers, developers, and small agencies find the right prospects, personalize outreach, follow up, and understand why their offers aren't converting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full transition-colors"
            >
              Start finding customers
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 text-lg font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-8 py-4 rounded-full transition-colors"
            >
              See how it works
            </Link>
          </div>
        </section>

        <section className="px-6 lg:px-14 pb-24 max-w-6xl mx-auto">
          <div className="rounded-2xl border bg-white shadow-2xl overflow-hidden">
            {/* Fake Dashboard UI */}
            <div className="flex h-12 bg-slate-100 border-b items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex h-[600px]">
              <div className="w-64 border-r bg-slate-50 p-4 hidden md:block">
                <div className="space-y-4">
                  <div className="h-8 bg-slate-200 rounded-md w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-2/3"></div>
                  <div className="h-4 bg-blue-200 rounded-md w-3/4 mt-8"></div>
                  <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                </div>
              </div>
              <div className="flex-1 p-8 bg-white">
                <div className="h-8 bg-slate-200 rounded-md w-1/4 mb-8"></div>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="h-24 bg-slate-100 rounded-xl border"></div>
                  <div className="h-24 bg-slate-100 rounded-xl border"></div>
                  <div className="h-24 bg-slate-100 rounded-xl border"></div>
                </div>
                <div className="h-64 bg-slate-50 rounded-xl border"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
