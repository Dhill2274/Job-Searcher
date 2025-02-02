import { useLocation } from "react-router-dom";
import { scrapeData } from "../Server/Scraper";
import { useEffect, useState } from "react";

type ScrapedData = {
  title: string;
  link: string;
  description: string;
};

export function JobPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
  
    const jobInfo = params.get("job");
    const locationInfo = params.get("location");
    const distance = params.get("distance");
    
    const [data, setData] = useState<ScrapedData[] | null>(null); // State to store the scraped data
    const [loading, setLoading] = useState(true); // State to manage loading status
  
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch("http://localhost:5000/scrape");
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }
          const jsonData: ScrapedData[] = await res.json();
          setData(jsonData);
        } catch (err) {
          console.error("Error fetching:", err);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Job Page</h1>
        <p>Job Info: {data ? (
      data.map((job) => (
        <div key={job.link}>
          <h2>{job.title}</h2>
          <a href={job.link}>{job.link}</a>
          <p>{job.description}</p>
        </div>
      ))
    ) : (
      <p>Loading or no data</p>
    )}</p>
        <p>Location Info: {locationInfo}</p>
        <p>Distance: {distance} miles</p>
      </div>
    );
}