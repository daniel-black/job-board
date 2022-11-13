import Link from "next/link";
import { SearchResult } from "../../../types";

export default async function JobPage({ searchParams }: {
  searchParams: { q: string },
}) {

  const res = await fetch(`http://localhost:3000/api/jobs?q=${searchParams.q}`);
  const data = await res.json();

  const results = data.requestData.SearchResult as SearchResult;

  return (
    <div className="p-10">
      <div>{results.SearchResultCountAll} Total Results for "{searchParams.q}"</div>
      <hr />
      <h3>Results</h3>
      <ul className="space-y-6">
        {results.SearchResultItems.map(r => (
          <li className="p-3 bg-yellow-50 rounded" key={r.MatchedObjectId}>
            <Link href={`/search/jobs/${r.MatchedObjectId}`}>
              {r.MatchedObjectDescriptor.PositionTitle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}