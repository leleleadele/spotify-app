"use client";

import Image from "next/image";
import styles from "./page.module.css";
import SearchPanel from "@/components/SearchPanel";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image
        src="/birdie-1280.png"
        width={834}
        height={1280}
        alt="sparrow"
        className={styles.backgroundImage}
      />

      <main className={styles.main}>
        <SearchPanel />
      </main>
    </div>
  );
}
