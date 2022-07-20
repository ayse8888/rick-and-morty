import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLocations } from '../redux/slices/locationSlice';

const Residents = () => {
  const dispatch = useDispatch();
  const { residentsId } = useParams();
  const locationsData = useSelector(
    (state) => state?.location?.locations?.results
  );
  const loading = useSelector((state) => state?.location?.loading);
  const matchedResidentsIds = locationsData?.filter(
    (item) => Number(item.id) === Number(residentsId)
  );
  const residents = matchedResidentsIds && matchedResidentsIds[0].residents;
  const residentsUrl = residents?.map((url) => url);

  console.log("residentsUrl", residentsUrl);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);


const [locationResidents, setLocationResidents] = useState([])

useEffect(() => {
  async function fetchAll() {
    const results = await Promise.all(
      residentsUrl?.map((url) => fetch(url).then((r) => r.json()))
    );
    console.log("results", results);
    setLocationResidents(results);
  }
  fetchAll();
}, []);

  console.log("locationResidents", locationResidents);

  return (
    <div>
      {locationResidents
        ?.map((location) => (
          <div>{location.name}</div>
        ))}
    </div>
  );
}

export default Residents;