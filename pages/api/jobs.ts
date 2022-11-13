import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req;

  if (Object.entries(query).length !== 1) {
    res.status(400).json({ msg: 'bad request' });
  }

  const key = Object.keys(query)[0];
  if (key !== 'q') {
    res.status(400).json({ msg: 'key must be "q"' });
  }
  
  const request = await fetch(
    `https://data.usajobs.gov/api/search?Keyword=${query.q}`
    , {
      headers: {
        'Authorization-Key': 'ZGz9Q0Brvi9Em3ptH4KZtbp8I4Hel+KoHyo/VuaWMnA='
      }
    });
  const requestData = await request.json();

  res.status(200).json({ requestData });
}
