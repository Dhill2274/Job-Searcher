import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Checklist from './Checklist';
import SearchBox from './Searchbox';

function App() {
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <div style={{ display: 'flex', gap: '100px', justifyContent: 'center'}}>
        <Checklist
          items={['Grad Job', 'Internship', 'Year Long Placement']}
          name='Role Type'
        />
      </div>

      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Search Box Example</h1>
        <SearchBox placeholder="Type to search..." onSearch={handleSearch} />
        <div style={{ marginTop: "20px" }}>
          <h3>Results:</h3>
          {results.length > 0 && (
            <ul>
              {results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
            ) 
          }
        </div>
      </div>
    </div>
  )
}

export default App
