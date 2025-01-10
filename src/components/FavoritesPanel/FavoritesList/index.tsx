import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import styles from "./index.module.css";
import { removeFavorite } from "@/store/slice";
import CloseIcon from "@/components/common/icons/Close";
import Image from "next/image";
import Heading from "@/components/common/Heading";

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

  const fetchFavorites = async () => {
    if (Object.keys(favorites).length > 0) {
      const ids = Object.keys(favorites).join(",");
      console.log(ids, favorites, Object.keys(favorites));
      const response = await fetch(`/api/tracks?ids=${ids}`);
      const data = await response.json();
      setFavoriteTracks(data.tracks);
    }
  };

  useEffect(() => {
    Object.keys(favorites).length ? fetchFavorites() : setFavoriteTracks([]);
  }, [favorites]);

  const handleRemove = (id: string) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Dziesma</th>
            <th>Albums</th>
            <th>Izpildītājs</th>
            <th></th>
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
                  <CloseIcon height={32} width={32} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!favoriteTracks.length && (
        <div className={styles.emptyMessage}>
          <Image
            src="/birdie-1280.png"
            width={834 / 3}
            height={1280 / 3}
            alt="sparrow"
          />
          <div>
            <Heading tag="p">Izlasē nav nevienas dziesmas</Heading>
            <p>
              Sameklē dziesmu un atzīmē to ar sirsniņu, lai pievienotu izlasei
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
