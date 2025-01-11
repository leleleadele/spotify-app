import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import styles from "./index.module.css";
import { removeFavorite } from "@/store/slice";
import CloseIcon from "@/components/common/icons/Close";
import fetchFavorites from "@/services/fetchFavorites";
import EmptyMessage from '../EmptyMessage';

interface Track {
  id: string;
  name: string;
  album: {
    name: string;
  };
  artists: { name: string }[];
}

const FavoritesList: React.FC = () => {
  const { favorites } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const [favoriteTracks, setFavoriteTracks] = useState<Track[]>([]);

  const handleRemove = (id: string) => {
    dispatch(removeFavorite(id));
  };

  useEffect(() => {
    const loadFavorites = async () => {
      if (Object.keys(favorites).length) {
        const tracks = await fetchFavorites(favorites);
        setFavoriteTracks(tracks);
        return;
      }
      setFavoriteTracks([]);
    };

    loadFavorites();
  }, [favorites]);

  return (
    <div className={styles.content}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.cell}>Dziesma</th>
            <th className={styles.cell}>Albums</th>
            <th className={styles.cell}>Izpildītājs</th>
            <th className={styles.cell}></th>
          </tr>
        </thead>
        <tbody className={styles.table}>
          {favoriteTracks.map((track) => (
            <tr key={track.id} className={styles.row}>
              <td className={styles.cell}>{track.name}</td>
              <td className={styles.cell}>{track.album.name}</td>
              <td className={styles.cell}>
                {track.artists.map((artist) => artist.name).join(", ")}
              </td>
              <td className={styles.cell}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(track.id)}
                >
                  <CloseIcon height={32} width={32} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!favoriteTracks.length && (
        <EmptyMessage />
      )}
    </div>
  );
};

export default FavoritesList;
