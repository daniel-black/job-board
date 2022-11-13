import Link from "next/link";
import formatMoney from "../../../../lib/format-money";
import { PositionRemuneration, SearchResult } from "../../../../types";

export default async function JobPage({ params, searchParams }: { 
  params: { jobId: string },
  searchParams: { q?: string }
}) {
  const res = await fetch(`http://localhost:3000/api/jobs?q=${params.jobId}`);
  const data = await res.json();

  const results = data.requestData.SearchResult as SearchResult;
  const j = results.SearchResultItems[0].MatchedObjectDescriptor;

  const openings = j.UserArea.Details?.TotalOpenings;


  return (
    <div className="px-8 py-10 max-w-5xl">
      <BackButton route={`/search?q=${searchParams.q}`} />

      {/* Position Title and Apply button */}
      <div className="my-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">{j.PositionTitle}</h1>
        <a 
          className="px-6 py-1 rounded-full bg-yellow-300 border-2 font-bold text-xl border-yellow-400" 
          href={j.ApplyURI[0]} 
          target='_blank'
        >
          Apply
        </a>
      </div>

      {/* Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Details</h2>
        <div className="flex space-x-3">
          <PayCard payDetails={j.PositionRemuneration[0]} />
          {openings && (
            <div className="bg-sky-100 border border-sky-400 px-2 py-1 rounded-lg max-w-fit">
              <p className="font-semibold text-sky-900">
                {isNaN(parseInt(openings)) ? openings.toUpperCase() : openings}
              </p>
              <p className="text-right text-sky-600 text-sm">
                opening{parseInt(openings) === 1 ? '' : 's'}
              </p>
            </div>
          )}
        </div>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border" open>
          <summary className="cursor-pointer">Job Summary</summary>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{j.UserArea.Details?.JobSummary}</p>
        </details>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border">
          <summary className="cursor-pointer">Requirements</summary>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{j.UserArea.Details?.Requirements}</p>
        </details>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border">
          <summary className="cursor-pointer">Education</summary>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{j.UserArea.Details?.Education}</p>
        </details>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border">
          <summary className="cursor-pointer">Required Documents</summary>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{j.UserArea.Details?.RequiredDocuments}</p>
        </details>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border">
          <summary className="cursor-pointer">Evaluations</summary>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{j.UserArea.Details?.Evaluations}</p>
        </details>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border">
          <summary className="cursor-pointer">How To Apply</summary>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{j.UserArea.Details?.HowToApply}</p>
        </details>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border">
          <summary className="cursor-pointer">What To Expect Next</summary>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{j.UserArea.Details?.WhatToExpectNext}</p>
        </details>

        <details className="p-3 mt-3 rounded-lg bg-yellow-50 border">
          <summary className="cursor-pointer">{j.DepartmentName} / {j.OrganizationName} / {j.SubAgency} </summary>
          <blockquote className="p-3 mt-3 rounded-lg bg-yellow-100 border">
            "{j.UserArea.Details?.AgencyMarketingStatement}"
          </blockquote>
        </details>
        
      </div>
    </div>
  );
}

function BackButton({ route }: { route: string }) {
  return (
    <Link 
      className="text-neutral-600 hover:underline underline-offset-2 duration-100"
      href={route}
    >
      ← back to search results
    </Link>
  );
}

function PayCard({ payDetails }: { payDetails: PositionRemuneration }) {
  const min = formatMoney(+payDetails.MinimumRange);
  const max = formatMoney(+payDetails.MaximumRange);
  const per = payDetails.Description.toLowerCase();

  return (
    <div className="bg-emerald-100 border border-emerald-400 px-2 py-1 rounded-lg max-w-fit">
      <p className="font-semibold text-emerald-900">{min} ~ {max}</p>
      <p className="text-right text-emerald-600 text-sm">{per}</p>
    </div>
  );
}