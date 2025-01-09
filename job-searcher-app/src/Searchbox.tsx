import React, { useState } from 'react';

type SearchBoxProps = {};

const SearchBox: React.FC<SearchBoxProps> = () => {

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <form method="post" onSubmit={handleSearch} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        name='Job Info'
        type="text"
        placeholder={"Search jobs, keywords, companies"}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          flex: "1",
        }}
      />

      <input
      name='Location Info'
        type="text"
        placeholder={"Enter location or 'remote'"}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          flex: "1",
        }}
      />

      <select name="selectedDistance" defaultValue="Default">
        <option value="Default">Select Distance</option>
          <option value="10">10 miles</option>
          <option value="30">30 miles</option>
          <option value="50">50 miles</option>
      </select>

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
