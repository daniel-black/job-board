import { SearchResult } from "../../../types";
import { LayoutProps } from "../../layout";

export default async function JobsLayout({children}: LayoutProps) {

  // const res = await fetch(`http://localhost:3000/api/jobs?q=${searchParams.q}`);
  // const data = await res.json();

  // const results = data.requestData.SearchResult as SearchResult;

  return (
    <div className="flex flex-row h-full ">
      <p>I am the /search/jobs layout</p>
      {/* <p>{searchParams.q}</p> */}
      {children}
    </div>
  );
}