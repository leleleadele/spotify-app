import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import styles from "./index.module.css";
import {
  fetchFavoritesThunk,
  removeFavorite,
} from "@/store/slices/spotifySlice";
import CloseIcon from "@/components/_icons/Close";
import EmptyMessage from "../../EmptyMessage";
import loadDataFromStorage from "@/utils/loadDataFromStorage";

const FavoritesTable: React.FC = () => {
  typeof window !== "undefined" ? loadDataFromStorage("favorites") : {};
  const { favorites } = useSelector((state: RootState) => state.spotify);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (id: string) => {
    dispatch(removeFavorite(id));
  };

  useEffect(() => {
    const storedIds =
      typeof window !== "undefined" ? loadDataFromStorage("favorites") : [];
    dispatch(fetchFavoritesThunk(storedIds));
  }, []);

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
          {Object.values(favorites).map((track) => (
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
      {!Object.values(favorites).length && <EmptyMessage />}
    </div>
  );
};

export default FavoritesTable;
