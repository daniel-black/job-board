import { SearchResult } from "../../types";
import JobListItem from "./JobListItem";

export default async function SearchPage({ searchParams }: { 
  searchParams: { Keyword?: string, LocationName?: string } 
}) {
  if (!searchParams?.Keyword) {
    return (
      <div className="px-8 py-10">
        <h3 className="text-2xl">
          Search for a job
        </h3>
        <p>Actually do it, you could find some cool shit</p>
      </div>
    );
  }

  const jobSearchParams = new URLSearchParams();
  jobSearchParams.append('Keyword', searchParams.Keyword);
  jobSearchParams.append('LocationName', searchParams.LocationName || '');

  const res = await fetch(`http://localhost:3000/api/jobs?${jobSearchParams.toString()}`);
  const data = await res.json();

  const result = data.requestData.SearchResult as SearchResult;

  const renderResultsLine = (): JSX.Element => {
    const what = searchParams.Keyword 
      ? <span className="font-bold text-black bg-yellow-50 rounded-lg px-2.5 py-0.5 border">"{searchParams.Keyword}"</span> 
      : null;

    const where = searchParams.LocationName 
      ? <span className="font-bold text-black bg-yellow-50 rounded-lg px-2.5 py-0.5 border">"{searchParams.LocationName}"</span> 
      : null;
    
    return (
      <div className="mb-10 text-neutral-600">
        <span className="font-bold text-black bg-yellow-50 rounded-lg px-2.5 py-0.5 border">{result.SearchResultCountAll}</span> total results for {what} {searchParams.LocationName ? 'in' : ''} {where}
      </div>
    );
  }

  return (
    <div className="px-8 py-10 w-full">
      {renderResultsLine()}
      <ul className="space-y-6">
        {result.SearchResultItems.map(r => (
          <JobListItem 
            job={r} 
            keyword={searchParams.Keyword}
            locationName={searchParams.LocationName}
            key={r.MatchedObjectId} 
          />
        ))}
      </ul>
    </div>
  );
}
