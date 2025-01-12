import Heading from "../Heading";
import FavoritesList from "../FavoritesTable";
import styles from "./FavoritesPanel.module.css";

const FavoritesPanel: React.FC = () => {
  return (
    <div data-testid="favorites-panel" className={styles.favorites}>
      <div className={styles.heading}>
        <Heading tag="h1">Tava īpašā izlase</Heading>
      </div>
      <FavoritesList />
    </div>
  );
};

export default FavoritesPanel;
