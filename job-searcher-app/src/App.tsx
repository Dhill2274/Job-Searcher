import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Checklist from './Checklist';

function App() {
  const [count, setCount] = useState(0)
  const handleSelect = (option: string) => {
    alert(`You selected: ${option}`);
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
      <div style={{ padding: '2rem' }}>
        <Checklist
          items={['Grad Job', 'Internship', 'Year Long Placement']}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
