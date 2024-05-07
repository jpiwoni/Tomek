import React from "react";
import { Container } from "react-bootstrap";

function Forbidden() {
  return (
    <Container fluid className="vh-100 vw-100 text-center p-5">
      403
      <p className="lead mb-5">Forbidden</p>
    </Container>
  );
}

export default Forbidden;
