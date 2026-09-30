import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { OnboardingWizard } from "@/components/dashboard/OnboardingWizard";

export default async function OnboardingPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-3xl bg-white border rounded-2xl shadow-xl overflow-hidden">
        <OnboardingWizard />
      </div>
    </div>
  );
}
