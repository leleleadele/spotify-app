import { TrackObject } from "@/types";

const fetchSearchResults = async (
  query: string,
  offset: number = 0,
  limit: number = 10
): Promise<TrackObject[]> => {
  try {
    const response = await fetch(
      `/api/search?query=${query}&offset=${offset}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    return data.tracks?.items || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export default fetchSearchResults;
