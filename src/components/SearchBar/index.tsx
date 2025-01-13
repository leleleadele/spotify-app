import { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (): void => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Meklē pēc ieraksta, albuma vai izpildītāja vārda"
      />
      <button className={styles.button} onClick={handleSearch}>
        Meklēt
      </button>
    </div>
  );
};

export default SearchBar;
