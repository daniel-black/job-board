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
    `https://data.usajobs.gov/api/search?${searchParams.toString()}`, 
    {
      headers: {
        'Authorization-Key': process.env.JOBS_API_KEY || ''
      }
    }
  );

  if (request.status === 400) {
    res.status(400).json({ msg: 'api received 400 from other api' });
    throw new Error('error: 400');
  } else if (request.status === 404) {
    res.status(404).json({ msg: 'api received 404 from other api' });
    throw new Error('error: 404');
  }


  const requestData = await request.json();

  res.status(200).json({ requestData });
}
