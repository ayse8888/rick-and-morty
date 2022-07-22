import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import { STATUS } from "../../constants/statusConstant";
import { getLocations } from "../../redux/slices/locationSlice";
import "./Residents.css";
import "../CommonStyle.css";
import { ReactComponent as LeftArrowSVG } from "../../assets/left-arrow.svg";
import avatarImg from "../../assets/avatar.jpeg";

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
  const filteredResidents =
    matchedResidentsIds && matchedResidentsIds[0].residents;
  const residentsUrl = filteredResidents?.map((url) => url);

  const [locationResidents, setLocationResidents] = useState([]);
  const [newResidentsUrl] = useState(residentsUrl); // to prevent infinite loop in promise

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);


  useEffect(() => {
    async function fetchAllResidentsUrl() {
      const results = await Promise.all(
        newResidentsUrl?.map((url) => fetch(url).then((resp) => resp.json()))
      );
      setLocationResidents(results);
    }
    fetchAllResidentsUrl();
  }, [newResidentsUrl]);


  function getBgColor(condition) {
    switch (condition) {
      case STATUS.UNKNOWN:
        return "#ef9d50";
      case STATUS.ALIVE:
        return "#a1dc6a";
      case STATUS.DEAD:
        return "red";
      default:
        return "#ef9d50";
    }
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Row className="py-5 px-3">
        <div className="residentsTitleContainer">
          <Link to="/">
            <LeftArrowSVG className="leftArrowIcon" />
          </Link>
          <h1 className="title">Residents</h1>
        </div>
        {locationResidents.length === 0 ? (
          <p>No Residents Here 😔</p>
        ) : (
          locationResidents?.map((resident) => (
            <Col
              lg={locationResidents?.length > 1 ? 6 : 12}
              key={resident.id}
              className="colContainer"
            >
              <Row className="flexContainer residentsFlexContainer">
                <Col sm={6} className="imgContainer residentsImgContainer">
                  <img
                    src={resident.image ? resident.image : avatarImg}
                    alt=""
                    className="img residentImg"
                  />
                </Col>
                <Col
                  sm={6}
                  className="detailsContainer residentsDetailsContainer"
                >
                  <p className="residentName">
                    {resident.name ? resident.name : "unknown"}
                  </p>
                  <div className="statusContainer">
                    <p
                      style={{
                        backgroundColor: getBgColor(resident?.status),
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        marginRight: "10px",
                      }}
                    ></p>
                    <p>{resident.status ? resident.status : "unknown"} -</p>
                    <p className="mx-1">
                      {resident.species ? resident.species : "unknown"}
                    </p>
                  </div>
                  <p>
                    <span className="subTitle">Origin:</span>
                    {resident.origin.name ? resident.origin.name : "unknown"}
                  </p>
                  <p>
                    <span className="subTitle">Type:</span>
                    {resident.type ? resident.type : "unknown"}
                  </p>
                  <p>
                    <span className="subTitle">Gender:</span>
                    {resident.gender ? resident.gender : "unknown"}
                  </p>
                </Col>
              </Row>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default Residents;
