import Heading from '../common/Heading';
import FavoritesList from "./FavoritesList";
import styles from "./index.module.css";

const FavoritesPanel: React.FC = () => {
  return (
    <div className={styles.favorites}>
      <Heading tag="h1">Tava īpašā izlase</Heading>
      <FavoritesList />
    </div>
  );
};

export default FavoritesPanel;
