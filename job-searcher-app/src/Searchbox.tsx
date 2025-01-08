import React, { useState } from 'react';

type SearchBoxProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');

  const combinedQuery = `${query1} ${query2}`;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(combinedQuery); // Pass the search query to the parent component
  };

  return (
    <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="text"
        placeholder={"Search jobs, keywords, companies"}
        value={query1}
        onChange={(e) => setQuery1(e.target.value)}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          flex: "1",
        }}
      />
      <input
        type="text"
        placeholder={"Enter location or 'remote'"}
        value={query2}
        onChange={(e) => setQuery2(e.target.value)}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          flex: "1",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
