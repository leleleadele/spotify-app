import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { SearchResponse } from "../../types";

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, limit, offset } = req.query;
  const tokenResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
  );
  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    res.status(401).json({ error: "Failed to retrieve access token" });
    return;
  }

  const token = tokenData.access_token;

  try {
    const response = await axios.get<SearchResponse>(
      "https://api.spotify.com/v1/search",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: query, type: "track", limit, offset },
      }
    );

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(res.statusCode).json({ error });
  }
}
