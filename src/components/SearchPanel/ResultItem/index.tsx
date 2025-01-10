import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import HeartIcon from "@/components/common/icons/Heart";
import styles from "./index.module.css";
import { addFavorite, removeFavorite } from "@/store/slice";
import { RootState } from "@/store";

interface ResultItemProps {
  data: any;
}

const ResultItem: React.FC<ResultItemProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.app);

  const imageUrl = data.album?.images?.[0]?.url || "";
  const handleFavoriteClick = (): void => {
    favorites[data.id]
      ? dispatch(removeFavorite(data.id))
      : dispatch(addFavorite(data.id));
  };

  return (
    <article>
      <div className={styles.resultItem}>
        <div className={styles.image}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={data.name}
              className={styles.ResultImage}
            />
          )}
        </div>
        <div className={styles.info}>
          <h3>{data.name}</h3>
          <p>{data.artists.map((artist: any) => artist.name).join(", ")}</p>
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
