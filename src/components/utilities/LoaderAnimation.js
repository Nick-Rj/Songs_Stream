import React from "react";
import HashLoader from "react-spinners/HashLoader";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
  Accordion,
} from "react-bootstrap";

const overrideCSS = {
  display: "block",
  //   width: "30rem",
  //   height: "30rem",
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
