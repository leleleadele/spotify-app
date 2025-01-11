import ResultItem from "./ResultItem";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styles from "./index.module.css";
import Heading from "../common/Heading";
import { TrackObject } from "@/pages/api/types";
import fetchSearchResults from "@/services/fetchSearchResults";
import HorizontalLoader from "../common/HorizontalLoader";

const SearchPanel: React.FC = () => {
  const [results, setResults] = useState<TrackObject[]>([]);
  const [query, setQuery] = useState<string>(""); // Current search query
  const [offset, setOffset] = useState<number>(0); // Pagination offset
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const limit = 10; // Number of results per page

  const handleSearch = async (searchQuery: string): Promise<void> => {
    setQuery(searchQuery); // Store the query for pagination
    setOffset(0); // Reset offset when performing a new search
    setLoading(true);
    const searchResults = await fetchSearchResults(searchQuery, 0, limit);
    setResults(searchResults);
    setLoading(false);
  };

  const loadMoreResults = async (newOffset: number): Promise<void> => {
    setLoading(true);
    const searchResults = await fetchSearchResults(query, newOffset, limit);
    setResults(searchResults);
    setOffset(newOffset);
    setLoading(false);
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.header}>
        <Heading tag="h2">Meklē dziesmu</Heading>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.results}>
        {loading ? (
          <HorizontalLoader />
        ) : (
          results.map((track) => <ResultItem data={track} key={track.id} />)
        )}
        {!loading && results.length > 0 && (
          <div className={styles.pagination}>
            <button
              onClick={() => loadMoreResults(Math.max(0, offset - limit))}
              disabled={offset === 0}
              className={styles.button}
            >
              Iepriekšējā lapa
            </button>
            <button
              onClick={() => loadMoreResults(offset + limit)}
              className={styles.button}
            >
              Nākamā lapa
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
