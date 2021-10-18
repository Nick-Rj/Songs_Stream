import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { Container, Row, Col } from "react-bootstrap";

const overrideCSS = {
  display: "block",
};

const LoaderAnimation = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <HashLoader
              color={"#7ED321"}
              loading={true}
              size={150}
              css={overrideCSS}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoaderAnimation;
