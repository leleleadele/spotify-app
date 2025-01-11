import { TrackObject } from "@/pages/api/types";

const fetchSearchResults = async (query: string): Promise<TrackObject[]> => {
  try {
    const response = await fetch(`/api/search?query=${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    return data.tracks?.items || [];
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
};

export default fetchSearchResults;
