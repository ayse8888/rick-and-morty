import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLocations } from "../../redux/slices/locationSlice";
import LoadingIndicator from "../../components/LoadingIndicator";
import './Locations.css'

const Locations = () => {
  const dispatch = useDispatch();
  const locationsData = useSelector(
    (state) => state?.location?.locations?.results
  );
  const loading = useSelector((state) => state?.location?.loading);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      {locationsData?.map((location) => (
        <Link to={`/${location.id}`} key={location.id}>
          <div className="container">
            <p>Location Name: {location.name}</p>
            <p>Location Type: {location.type}</p>
            <p>Location Dimension: {location.dimension}</p>
            <p>Location Residents: {location.residents.length}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Locations;
