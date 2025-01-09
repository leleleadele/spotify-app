import React, { useState } from "react";
import styles from "./index.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Meklēt ierakstus, albumus vai izpildītājus"
      />
      <button className={styles.button} onClick={handleSearch}>
        Meklēt
      </button>
    </div>
  );
};

export default SearchBar;
