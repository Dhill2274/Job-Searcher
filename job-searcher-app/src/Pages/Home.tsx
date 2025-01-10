import { useState } from 'react'
import SearchBox from '../Components/Searchbox';

export function HomePage() {

    return (
        <div className="App">
          <h1>AI Job Searcher</h1>
          <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Search Jobs</h2>
            <SearchBox/>
            <div style={{ marginTop: "20px" }}>
            </div>
          </div>
        </div>
      )
}