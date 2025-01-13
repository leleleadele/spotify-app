import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | { error: string }>
): Promise<void> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await axios.post<AuthResponse>(
      tokenUrl,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate with Spotify" });
  }
}
