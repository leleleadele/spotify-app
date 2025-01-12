import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import HeartIcon from "@/components/common/icons/Heart";
import styles from "./index.module.css";
import { addFavorite, removeFavorite } from "@/store/slices/spotify";
import { RootState } from "@/store";
import { ArtistObject, TrackObject } from "@/types";

interface ResultItemProps {
  data: TrackObject;
}

const ResultItem: React.FC<ResultItemProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.spotify);

  const imageUrl = data.album?.images?.[0]?.url || "";
  const handleFavoriteClick = (): void => {
    if (favorites[data.id]) {
      dispatch(removeFavorite(data.id));
      return;
    }
    dispatch(addFavorite(data.id));
  };

  return (
    <article>
      <div className={styles.resultItem}>
        {imageUrl && (
          <img src={imageUrl} alt={data.name} className={styles.image} />
        )}
        <div className={styles.info}>
          <h3 className={styles.text}>{data.name}</h3>
          <p className={styles.text}>
            {data.artists.map((artist: ArtistObject) => artist.name).join(", ")}
          </p>
        </div>
        <button
          type="button"
          className={cn(styles.heart, favorites[data.id] && styles.favorited)}
          onClick={handleFavoriteClick}
        >
          <HeartIcon width={32} height={32} />
        </button>
      </div>
    </article>
  );
};

export default ResultItem;
