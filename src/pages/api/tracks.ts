import { TracksResponse } from "./types";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ids } = req.query;
  const tokenResponse = await fetch("http://localhost:3000/api/auth");
  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    res.status(401).json({ error: "Failed to retrieve access token" });
    return;
  }

  const token = tokenData.access_token;

  try {
    const response = await axios.get<TracksResponse>(
      "https://api.spotify.com/v1/tracks",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { ids },
      }
    );
    res.status(200).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Spotify API Error:",
        error.response?.data || error.message
      );

      res.status(500).json({ error: "Failed to fetch tracks" });
    }
  }
}
