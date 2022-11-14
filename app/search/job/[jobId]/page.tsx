import Link from "next/link";
import formatMoney from "../../../../lib/format-money";
import { PositionRemuneration, SearchResult } from "../../../../types";

export default async function JobPage({ params, searchParams }: any) {

  const prevSearchParams = new URLSearchParams();
  console.log(searchParams)

  for (let [key, val] of Object.entries(searchParams)) {
    prevSearchParams.append(key, val as string);
  }

  const url = process.env.NODE_ENV === 'production'
    ? 'https://us-gov-jobs.vercel.app'
    : 'http://localhost:3000';

  const res = await fetch(`${url}/api/jobs?q=${params.jobId}`);
  const data = await res.json();

  const results = data.requestData.SearchResult as SearchResult;
  const j = results.SearchResultItems[0].MatchedObjectDescriptor;

  const openings = j.UserArea.Details?.TotalOpenings;


  return (
    <div className="px-8 py-10 max-w-5xl">
      <BackButton route={`/search?${prevSearchParams.toString()}`} />

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

        <DetailSection 
          title="Job Summary" 
          content={j.UserArea.Details?.JobSummary} 
          initiallyOpen={true} 
        />
        <DetailSection 
          title="Major Duties" 
          content={j.UserArea.Details?.MajorDuties} 
          initiallyOpen={true}
        />
        <DetailSection 
          title="Education" 
          content={j.UserArea.Details?.Education} 
        />
        <DetailSection 
          title="Requirements" 
          content={j.UserArea.Details?.Requirements} 
        />
        <DetailSection 
          title="Required Documents" 
          content={j.UserArea.Details?.RequiredDocuments} 
        />
        <DetailSection 
          title="Evaluations" 
          content={j.UserArea.Details?.Evaluations} 
        />
        <DetailSection
         title="How To Apply" 
         content={j.UserArea.Details?.HowToApply} 
        />
        <DetailSection 
          title="What To Expect Next" 
          content={j.UserArea.Details?.WhatToExpectNext} 
        />
        <DetailSection 
          title={`${j.DepartmentName} / ${j.OrganizationName}${j.SubAgency ? ` / ${j.SubAgency}` : ''}`} 
          content={j.UserArea.Details?.AgencyMarketingStatement}
        />
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

function DetailSection({ title, content, initiallyOpen }: {
  title: string,
  content: string | string[] | undefined,
  initiallyOpen?: boolean
}): JSX.Element | null {
  if (!content) return null;

  let contentJSX: JSX.Element;
  if (typeof content === 'string') {
    contentJSX = <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{content}</p>;
  } else {
    contentJSX = (<ul>
      {content.map((c, i) => (
        <li key={i}>
          <p className="p-3 mt-3 rounded-lg bg-yellow-100 border">{content}</p>
        </li>
      ))}
    </ul>);
  }

  return (
    <details className="p-3 mt-3 rounded-lg bg-yellow-50 border" open={initiallyOpen}>
      <summary className="cursor-pointer">{title}</summary>
      {contentJSX}
    </details>
  )
}