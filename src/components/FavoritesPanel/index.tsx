import FavoritesList from "./FavoritesList";
import styles from "./index.module.css";

const FavoritesPanel: React.FC = () => {
  return (
    <div className={styles.favorites}>
      <h2>Favorītiņi</h2>
      <FavoritesList />
    </div>
  );
};

export default FavoritesPanel;
