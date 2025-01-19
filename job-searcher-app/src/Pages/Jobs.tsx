import { useLocation } from "react-router-dom";
import { scrapeData } from "../Scraper";
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
      const fetchData = async () => {
        try {
          const results = await scrapeData(); // Fetch data asynchronously
          setData(results); // Update state with the fetched data
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Stop loading regardless of success or error
        }
      };
  
      fetchData(); // Call the async function
    }, []);
  
    return (
      <div>
        <h1>Job Page</h1>
        <p>Job Info: {jobInfo}</p>
        <p>Location Info: {locationInfo}</p>
        <p>Distance: {distance} miles</p>
      </div>
    );
}