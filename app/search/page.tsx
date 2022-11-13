import { SearchResult } from "../../types";
import JobListItem from "./JobListItem";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  if (!searchParams?.q) {
    return (
      <div className="px-8 py-10">
        <h3 className="text-2xl">
          Search for a job
        </h3>
        <p>Actually do it, you could find some cool shit</p>
      </div>
    );
  }

  const res = await fetch(`http://localhost:3000/api/jobs?q=${searchParams.q}`);
  const data = await res.json();

  const result = data.requestData.SearchResult as SearchResult;

  return (
    <div className="px-8 py-10">
      <div className="mb-10">
        {result.SearchResultCountAll} Total Results for <span className="font-bold">"{searchParams.q}"</span>
      </div>
      <ul className="space-y-6">
        {result.SearchResultItems.map(r => (
          <JobListItem job={r} q={searchParams.q} key={r.MatchedObjectId} />
        ))}
      </ul>
    </div>
  );
}
