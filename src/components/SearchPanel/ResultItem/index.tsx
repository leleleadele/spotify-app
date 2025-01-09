import HeartIcon from '@/components/common/Heart';
import styles from "./index.module.css";

interface ResultItemProps {
  data: any;
}

const ResultItem: React.FC<ResultItemProps> = ({ data }) => {
  const imageUrl = data.album?.images?.[0]?.url || "";

  return (
    <div className={styles.resultItem}>
      <div className={styles.image}>
        {imageUrl && (
          <img src={imageUrl} alt={data.name} className={styles.ResultImage} />
        )}
      </div>
      <div className={styles.info}>
        <h3>{data.name}</h3>
        <p>
          {data.artists.map((artist: any) => artist.name).join(", ")}
        </p>
      </div>
      <div className={styles.heart}>
        <HeartIcon width={32} height={32} />
      </div>
    </div>
  );
};

export default ResultItem;
