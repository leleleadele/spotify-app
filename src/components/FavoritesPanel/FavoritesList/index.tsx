import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import styles from "./index.module.css";
import { removeFavorite } from '@/store/slice';

interface Track {
  id: string;
  name: string;
  album: {
    name: string;
  };
  artists: { name: string }[];
}

const FavoritesList: React.FC = () => {
  const favoriteIds = useSelector((state: RootState) => state.app.favorites); // Adjust this based on your state structure
  const dispatch = useDispatch();
  const [favoriteTracks, setFavoriteTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoriteIds.length > 0) {
        const ids = favoriteIds.join(",");
        const response = await fetch(`/api/spotify/tracks?ids=${ids}`);
        const data = await response.json();
        setFavoriteTracks(data.tracks);
      }
    };

    fetchFavorites();
  }, [favoriteIds]);

  const handleRemove = (id: string) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Track Name</th>
            <th>Album</th>
            <th>Artists</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {favoriteTracks.map((track) => (
            <tr key={track.id}>
              <td>{track.name}</td>
              <td>{track.album.name}</td>
              <td>{track.artists.map((artist) => artist.name).join(", ")}</td>
              <td>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(track.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoritesList;
