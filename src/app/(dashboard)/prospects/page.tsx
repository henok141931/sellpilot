import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getProspects } from "@/app/actions/prospects";
import { AddProspectDialog } from "@/components/prospects/AddProspectDialog";

export default async function ProspectsPage() {
  const prospects = await getProspects();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Prospects</h1>
          <p className="text-slate-500 mt-1">Discover and manage your potential customers.</p>
        </div>
        <AddProspectDialog />
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9 bg-white" placeholder="Search prospects..." />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>ICP Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prospects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No prospects found. Add one to get started!
                </TableCell>
              </TableRow>
            )}
            {prospects.map((prospect) => (
              <TableRow key={prospect.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  {prospect.companyName}
                  {(prospect.followUps && prospect.followUps.length > 0) && (
                    <span className="flex items-center justify-center bg-amber-100 text-amber-700 p-1 rounded" title="Follow-up due">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    </span>
                  )}
                </TableCell>
                <TableCell>{prospect.industry || "-"}</TableCell>
                <TableCell>{prospect.location || "-"}</TableCell>
                <TableCell>
                  <span className={`font-bold ${prospect.icpScore && prospect.icpScore >= 90 ? 'text-green-600' : 'text-blue-600'}`}>
                    {prospect.icpScore || 0}/100
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={prospect.status === 'NEW' ? 'secondary' : 'default'} className={
                    prospect.status === 'NEW' ? 'bg-slate-100 text-slate-700' :
                    prospect.status === 'CONTACTED' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }>
                    {prospect.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/prospects/${prospect.id}`}>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
