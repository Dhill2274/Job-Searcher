import { useState } from 'react'
import './App.css'
import SearchBox from './Components/Searchbox';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "./Pages/Home";
import {JobPage} from "./Pages/Jobs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Jobs" element={<JobPage />} />
      </Routes>
    </Router>
  );
}

export default App
