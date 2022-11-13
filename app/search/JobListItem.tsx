import Link from "next/link";
import formatMoney from "../../lib/format-money";
import { SearchResultItem } from "../../types";

type JobListItemProps = {
  job: SearchResultItem,
  keyword: string | undefined,
  locationName: string | undefined
  q?: string,
}

export default function JobListItem({ job, keyword, locationName }: JobListItemProps) {
  const min = formatMoney(+job.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange);
  const max = formatMoney(+job.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange);

  const searchParams = new URLSearchParams();
  searchParams.append('Keyword', keyword || '');
  searchParams.append('LocationName', locationName || '');

  const getPayString = (): string => {
    let s = job.MatchedObjectDescriptor.PositionRemuneration[0].Description.toLowerCase();
    if (min === max) {
      return `${max} ${s}`;
    }
    return `${min} - ${max} ${s}`;
  }

  const getLocationString = (): string => {
    const text = job.MatchedObjectDescriptor.PositionLocationDisplay;
    if (text === 'Multiple Locations') {
      return `${text} (${job.MatchedObjectDescriptor.PositionLocation.length})`;
    }
    return text;
  }

  const mode = job.MatchedObjectDescriptor.UserArea.Details?.TeleworkEligible 
    ? 'Remote' 
    : 'In person';

  return (
    <li className="py-3 px-6 bg-yellow-50 border rounded-lg" key={job.MatchedObjectId}>
      <Link 
        className="font-semibold underline underline-offset-4" 
        href={`/search/job/${job.MatchedObjectId}?${searchParams.toString()}`}
      >
        {job.MatchedObjectDescriptor.PositionTitle}
      </Link>
      <div className="text-neutral-600 mt-2">
        <p>{getPayString()}</p>
        <p>{getLocationString()}</p>
        <p>{mode}</p>
      </div>
    </li>
  );
}