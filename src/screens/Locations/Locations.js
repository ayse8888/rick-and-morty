import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLocations } from "../../redux/slices/locationSlice";
import LoadingIndicator from "../../components/LoadingIndicator";
import "./Locations.css";
import "../CommonStyle.css";
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
        <Row className="flexContainer locationFlexContainer" key={location.id}>
          <Col sm={6} className="imgContainer locationImgContainer">
            <Link to={`/${location.id}`}>
              <img src={locationImg} alt="" className="img locationImg" />
            </Link>
          </Col>
          <Col sm={6} className="detailsContainer locationDetailsContainer">
            <p>
              <span className="subTitle">Location:</span>{" "}
              {location.name ? location.name : "unknown"}
            </p>
            <p>
              <span className="subTitle">Type:</span>{" "}
              {location.type ? location.type : "unknown"}
            </p>
            <p>
              <span className="subTitle">Dimension:</span>{" "}
              {location.dimension ? location.dimension : "unknown"}
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
