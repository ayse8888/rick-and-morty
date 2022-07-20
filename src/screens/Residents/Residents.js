import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import { getLocations } from "../../redux/slices/locationSlice";
import "./Residents.css";

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
  const filteredResidents = matchedResidentsIds && matchedResidentsIds[0].residents;
  const residentsUrl = filteredResidents?.map((url) => url);

  const [locationResidents, setLocationResidents] = useState([]);
  const [newResidentsUrl] = useState(residentsUrl); // to prevent infinite loop in promise

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  useEffect(() => {
    async function fetchAll() {
      const fetchResidentsUrl = await Promise.all(
        newResidentsUrl?.map((url) => fetch(url).then((r) => r.json()))
      );
      setLocationResidents(fetchResidentsUrl);
    }
    fetchAll();
  }, [newResidentsUrl]);

  console.log("locationResidents", locationResidents);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Row>
        {locationResidents?.map((resident) => (
          <Col sm={locationResidents.length > 1 ? 6 : 12} key={resident.id}>
            <img src={resident.image} alt="" />
            <p>{resident.name}</p>
            <p>{resident.species}</p>
            <p>{resident.type}</p>
            <p>{resident.gender}</p>
            <p>{resident.origin.name}</p>
            <p>{resident.status}</p>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Residents;
