import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries());
      if (formJson.jobInfo === '') {
      alert('Enter job, keyword or company!');
    } else if (formJson.location === '') {
      alert("Enter a location or 'remote'!");
    } else if (formJson.selectedDistance === 'Default') {
      alert('Select a distance!');
    } else {
      const jobInfo = encodeURIComponent(formJson["jobInfo"] as string);
      const location = encodeURIComponent(formJson["location"] as string);
      const distance = encodeURIComponent(formJson["selectedDistance"] as string);
  
      navigate(`/Jobs?job=${jobInfo}&location=${location}&distance=${distance}`);
    }
  };

  return (
    <form method="post" onSubmit={handleSearch} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        name='jobInfo'
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
      name='location'
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
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
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
