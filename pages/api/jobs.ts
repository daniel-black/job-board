import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req;
  // query = { Keyword: string, LocationName: string }

  const searchParams = new URLSearchParams();
  for (let [key, val] of Object.entries(query)) {
    if (typeof val !== 'string') val = '';
    searchParams.append(key, val);
  }
  
  const request = await fetch(
    `https://data.usajobs.gov/api/search?${searchParams.toString()}`
    , {
      headers: {
        'Authorization-Key': process.env.JOBS_API_KEY || ''
      }
    });
  const requestData = await request.json();

  res.status(200).json({ requestData });
}
