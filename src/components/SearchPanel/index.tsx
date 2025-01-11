import ResultItem from "./ResultItem";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styles from "./index.module.css";
import Heading from '../common/Heading';

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
        <Heading tag="h2">Meklē dziesmu</Heading>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.results}>
        {results.map((track) => (
          <ResultItem data={track} key={track.id} />
        ))}
      </div>
    </div>
  );
}
