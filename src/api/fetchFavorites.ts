const fetchFavorites = async (favorites: Record<string, boolean>) => {
  if (Object.keys(favorites).length > 0) {
    const ids = Object.keys(favorites).join(",");
    const response = await fetch(`/api/tracks?ids=${ids}`);
    const data = await response.json();
    return data.tracks;
  }
  return [];
};

export default fetchFavorites;
