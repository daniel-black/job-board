'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { SearchResult } from "../../types";

export function SearchForm() {
  const [job, setJob] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const router = useRouter();

  // Maybe we actually want to do the data fetching in the form so we have all
  // the search results at the level of /search in state
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/jobs?q=${job}`);

    // const res = await fetch(`http://localhost:3000/api/jobs?q=${job}`);
    // const data = await res.json();

    // const result = data.requestData.SearchResult as SearchResult;
    
    // setSearchResult(result);
  }

  return (
    <aside className="border-r border-b px-8 py-10 rounded-xl rounded-t-none rounded-l-none">
      <div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">

          <div className="relative">
            <label className="text-xs text-neutral-500 absolute -top-2 -left-2 border border-yellow-400 bg-yellow-300 px-2 rounded-full -rotate-[16deg]" htmlFor="searchText">job</label>
            <input 
              value={job}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setJob(e.currentTarget.value)}
              id="saerchText"
              name="searchText" 
              className="search-input" 
              type="text" 
              placeholder="Park Ranger" 
            />
          </div>

          <div className="relative">
            <label className="text-xs text-neutral-500 absolute -top-2.5 -left-2 border border-yellow-400 bg-yellow-300 px-2 rounded-full -rotate-[16deg]" htmlFor="location">location</label>
            <input 
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.currentTarget.value)}
              id="location"
              name="location" 
              className="search-input" 
              type="text" 
              placeholder="Boulder, CO" 
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
          >
            Search
          </button>
        </form>

      </div>
    </aside>
  );
}