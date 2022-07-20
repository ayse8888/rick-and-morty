import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getLocations } from '../redux/slices/locationSlice';

const Locations = () => {
  // const [locations, setLocations] = useState([]);
  // const fetchPost = async () => {
  //   const response = await fetch("https://rickandmortyapi.com/api/location");
  //   const data = await response.json();
  //   console.log('data', data)
  //   setLocations(data?.results);
  // };

  // useEffect(() => {
  //   fetchPost();
  // }, []);
  // console.log("locations", locations);

  const dispatch = useDispatch();
  const locationsData = useSelector(state => state?.location?.locations?.results)
  const loading = useSelector(state => state?.location?.loading)
  // console.log("locationsData", locationsData);
  // console.log("loading", loading);

  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch]);

  return (
    <div>
      {locationsData?.map((location) => (
        <Link to={`/${location.id}`} key={location.id}>
          <div>{location.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default Locations
