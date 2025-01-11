"use client";

import cn from "classnames";
import styles from "./page.module.css";
import SearchPanel from "@/components/SearchPanel";
import FavoritesPanel from "@/components/FavoritesPanel";
import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Home() {
  const { activeView } = useSelector((state: RootState) => state.app);

  return (
    <div className={styles.page}>
      <Header />
      <main
        className={cn(
          styles.main,
          activeView === "favorites" && styles.showRight
        )}
      >
        <div className={cn(styles.panel, styles.left)}>
          <SearchPanel />
        </div>
        <div className={cn(styles.panel, styles.right)}>
          <FavoritesPanel />
        </div>
      </main>
    </div>
  );
}
