import React from "react";
import { Container } from "react-bootstrap";

function ErrorPage({ error }) {
  return (
    <Container fluid className="vw-100 vh-100 text-center p-5">
      Error
      {error.message}
    </Container>
  );
}

export default ErrorPage;
