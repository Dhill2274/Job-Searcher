import { useLocation } from "react-router-dom";

export function JobPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
  
    const jobInfo = params.get("job");
    const locationInfo = params.get("location");
    const distance = params.get("distance");
  
    return (
      <div>
        <h1>Job Page</h1>
        <p>Job Info: {jobInfo}</p>
        <p>Location Info: {locationInfo}</p>
        <p>Distance: {distance} miles</p>
      </div>
    );
}