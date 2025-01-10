import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const tokenResponse = await fetch("http://localhost:3000/api/auth");
  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    res.status(401).json({ error: "Failed to retrieve access token" });
    return;
  }

  const token = tokenData.access_token;
  
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: "track", limit: 10 },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(res.statusCode).json({ error });
  }
}
