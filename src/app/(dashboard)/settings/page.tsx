import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and workspace preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="Sarah" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Mekonnen" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue="sarah@example.com" disabled />
            </div>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Integrations</CardTitle>
            <CardDescription>Manage your connections to external services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>OpenAI API Key</Label>
              <Input type="password" placeholder="sk-..." defaultValue="sk-proj-..." />
              <p className="text-xs text-slate-500">Required for AI lead research and outreach generation.</p>
            </div>
            <div className="space-y-2">
              <Label>Resend API Key</Label>
              <Input type="password" placeholder="re_..." />
              <p className="text-xs text-slate-500">Required for sending emails.</p>
            </div>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Save Keys</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
