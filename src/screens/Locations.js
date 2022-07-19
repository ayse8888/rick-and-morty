import React, { useEffect, useState } from 'react'

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
        <div>{location.name}</div>
      ))}
    </div>
  );
}

export default Locations
