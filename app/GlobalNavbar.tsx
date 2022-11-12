// 'use client';

import Link from "next/link";

export function GlobalNavbar() {
  return (
    <nav className="flex justify-between items-center px-20 py-5 border-b-2 mb-20">
      <Link className="text-lg font-semibold bg-yellow-300 px-5 py-1 rounded-full" href={'/'}>
        Job Board
      </Link>

      <div className="space-x-10">
        <Link className="nav-item" href={'/search'}>
          Search
        </Link>

        <Link className="nav-item" href={'/search'}>
          Log in
        </Link>
      </div>
    </nav>
  );
}