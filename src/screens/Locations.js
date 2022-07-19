import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Residents from './Residents';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const fetchPost = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/location");
    const data = await response.json();
    console.log('data', data)
    setLocations(data?.results);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  console.log("locations", locations);
  return (
    <div>
      {locations?.map((location) => (
        <Link to={`/${location.id}`}>
          <div key={location.id}>{location.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default Locations
