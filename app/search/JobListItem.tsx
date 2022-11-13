import Link from "next/link";
import { SearchResultItem } from "../../types";

type JobListItemProps = {
  job: SearchResultItem,
  q?: string,
}

export default function JobListItem({ job, q }: JobListItemProps) {
  return (
    <li className="p-3 bg-yellow-50 border rounded-lg" key={job.MatchedObjectId}>
      <Link 
        className="font-semibold underline underline-offset-4" 
        href={`/search/job/${job.MatchedObjectId}?q=${q}`}
      >
        {job.MatchedObjectDescriptor.PositionTitle}
      </Link>
      <p>${job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange} - ${job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange} {job.MatchedObjectDescriptor.PositionRemuneration[0].Description}</p>
      <p>{job.MatchedObjectDescriptor.PositionLocationDisplay}</p>
      <p>{job.MatchedObjectDescriptor.UserArea.Details?.TeleworkEligible ? 'Remote' : 'In person'}</p>
    </li>
  );
}