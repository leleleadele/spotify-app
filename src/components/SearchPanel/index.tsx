import ResultItem from "./ResultItem";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styles from "./index.module.css";
import Heading from "../common/Heading";
import { TrackObject } from "@/pages/api/types";
import fetchSearchResults from '@/services/fetchSearchResults';

const SearchPanel: React.FC = () => {
  const [results, setResults] = useState<TrackObject[]>([]);

  const handleSearch = async (query: string): Promise<void> => {
    const searchResults = await fetchSearchResults(query);
    setResults(searchResults);
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
};

export default SearchPanel;
