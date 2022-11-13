import Link from "next/link";
import { SearchResult } from "../../../../types";

export default async function JobPage({ params, searchParams }: { 
  params: { jobId: string },
  searchParams: { q?: string }
}) {
  const res = await fetch(`http://localhost:3000/api/jobs?q=${params.jobId}`);
  const data = await res.json();

  const results = data.requestData.SearchResult as SearchResult;

  const j = results.SearchResultItems[0].MatchedObjectDescriptor;

  return (
    <div className="px-8 py-10 max-w-5xl">
      <Link href={`/search?q=${searchParams.q}`}>← back to search results</Link>
      <div className="flex justify-start items-center mb-10 space-x-10">
        <h1 className="text-3xl font-bold">{j.PositionTitle}</h1>
        <a className="px-6 py-1 rounded-full bg-yellow-300 border-2 font-bold text-xl border-yellow-400" href={j.ApplyURI[0]} target='_blank'>Apply</a>
      </div>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Details</h2>
        <div>
          <p>${j.PositionRemuneration[0].MinimumRange} - ${j.PositionRemuneration[0].MaximumRange} {j.PositionRemuneration[0].Description}</p>
          <p>{j.PositionLocationDisplay}</p>
          <p>{j.UserArea.Details?.TeleworkEligible ? 'Remote' : 'In person'}</p>
        </div>
        <div>
          <p>Job Summary</p>
          <p className="p-3 mt-3 rounded-lg bg-yellow-50 border">{j.UserArea.Details?.JobSummary}</p>
        </div>
        <div>
          <p>Requirements</p>
          <p className="p-3 mt-3 rounded-lg bg-yellow-50 border">{j.UserArea.Details?.Requirements}</p>
        </div>
        <div>
          <p>{j.DepartmentName} / {j.OrganizationName} / {j.SubAgency} </p>
          <blockquote className="p-3 mt-3 rounded-lg bg-yellow-50 border">
            "{j.UserArea.Details?.AgencyMarketingStatement}"
          </blockquote>
        </div>
        
      </div>
    </div>
  );
}