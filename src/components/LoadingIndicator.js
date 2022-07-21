import { Spinner } from "react-bootstrap";

function LoadingIndicator() {
  return (
    <div style={{marginTop: "10rem"}}>
      <Spinner animation="border" variant="warning" />
    </div>
  );
}

export default LoadingIndicator;
