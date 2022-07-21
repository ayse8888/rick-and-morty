import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLocations } from "../../redux/slices/locationSlice";
import LoadingIndicator from "../../components/LoadingIndicator";
import "./Locations.css";
import { Col, Row } from "react-bootstrap";
import locationImg from "../../assets/rick-and-morty.jpeg";


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
    <Col className="locationsListContainer">
      <h1 className="title">Welcome to My Rick and Morty Page !</h1>
      {locationsData?.map((location) => (
        <Row className="flexContainer">
          <Col sm={6} className="locationImgContainer">
            <Link to={`/${location.id}`} key={location.id}>
              <img src={locationImg} alt="" className="locationImg" />
            </Link>
          </Col>
          <Col sm={6} className="locationDetailsContainer">
            <p>
              <span className="subTitle">Location:</span> {location.name}
            </p>
            <p>
              <span className="subTitle">Type:</span> {location.type}
            </p>
            <p>
              <span className="subTitle">Dimension:</span> {location.dimension}
            </p>
            <p>
              <span className="subTitle">Residents:</span>{" "}
              {location.residents.length}
            </p>
          </Col>
        </Row>
      ))}
    </Col>
  );
};

export default Locations;
