import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

function PageNotFound() {
  useEffect(() => {
    localStorage.removeItem("login-next");
  }, []);

  return (
    <Container fluid className="vh-100 vw-100 text-center p-5">
      404
      <p className="lead mb-5">Page Not Found</p>
    </Container>
  );
}

export default PageNotFound;
