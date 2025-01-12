import { RootState } from "@/store";
import { setActiveView } from "@/store/slices/spotifySlice";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { activeView } = useSelector((state: RootState) => state.spotify);

  const openSearch = (): void => {
    dispatch(setActiveView("search"));
  };

  const openFavorites = (): void => {
    dispatch(setActiveView("favorites"));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <button
          type="button"
          className={cn(
            styles.button,
            activeView === "search" && styles.active
          )}
          onClick={openSearch}
        >
          Meklēt
        </button>
        <button
          type="button"
          className={cn(
            styles.button,
            activeView === "favorites" && styles.active
          )}
          onClick={openFavorites}
        >
          Izlase
        </button>
      </nav>
    </header>
  );
};

export default Header;
