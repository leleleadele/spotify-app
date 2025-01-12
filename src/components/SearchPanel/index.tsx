import SearchBar from "../SearchBar";
import { useState } from "react";
import styles from "./index.module.css";
import Heading from "../Heading";
import HorizontalLoader from "../HorizontalLoader";
import SearchResult from "../SearchResult";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResultsThunk } from "@/store/slices/spotifySlice";

const SearchPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading } = useSelector(
    (state: RootState) => state.spotify
  );
  const [query, setQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  const handleSearch = async (searchQuery: string): Promise<void> => {
    setQuery(searchQuery);
    setOffset(0);
    dispatch(fetchSearchResultsThunk({ query: searchQuery, offset: 0, limit }));
  };

  const loadMoreResults = async (newOffset: number): Promise<void> => {
    dispatch(fetchSearchResultsThunk({ query, offset: newOffset, limit }));
    setOffset(newOffset);
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.header}>
        <Heading tag="h2">Meklē dziesmu</Heading>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.results}>
        {loading.search ? (
          <HorizontalLoader />
        ) : (
          searchResults.map((track) => (
            <SearchResult data={track} key={track.id} />
          ))
        )}
        {!loading.search && searchResults.length > 0 && (
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
