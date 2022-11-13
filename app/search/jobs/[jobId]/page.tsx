import { SearchResult } from "../../../../types";

export default async function JobPage({ params }: { params: {jobId: string} }) {
  const res = await fetch(`http://localhost:3000/api/jobs?q=${params.jobId}`);
  const data = await res.json();

  const results = data.requestData.SearchResult as SearchResult;

  return (
    <div>
      I am the Job page for the job with jobId: {params.jobId}
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}