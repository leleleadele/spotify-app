import ResultItem from "./ResultItem";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styles from "./index.module.css";

export default function SearchPanel() {
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setResults(data.tracks?.items || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.header}>
        <h2>Meklēt Spotify</h2>
        <SearchBar onSearch={handleSearch} />
        {error && <p style={{ color: "red" }}>Kļūda: {error}</p>}
      </div>
      <div className={styles.results}>
        {results.map((track) => (
          <ResultItem data={track} key={track.id} />
        ))}
      </div>
    </div>
  );
}
