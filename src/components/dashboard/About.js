import React, { useState } from "react";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
  Card,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  pulse,
  tada,
  lightSpeedIn,
  rollIn,
  bounce,
  bounceIn,
  rubberBand,
  fadeIn,
  flash,
  zoomInUp,
  slideInUp,
  jello,
  swing,
} from "react-animations";
import "../../assets/styles/About.css";

const AnimateAbout = styled.div`
  animation: 1.5s ${keyframes`${bounce}`};
`;

const About = ({ userState }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const username = userState.isLoggedIn ? userState.user.firstName : "User";
  return (
    <div className="About">
      <Container id="header">
        <Row>
          <Col>
            <Link to="/songsLibrary">
              <Button variant="warning" id="backToLib">
                Back to Songs
              </Button>
            </Link>
          </Col>
          <Col xs={2} lg={4}></Col>
          <Col xs={2} lg={4}></Col>
        </Row>
      </Container>
      <AnimateAbout>
        <Container>
          <Row>
            <Col>
              <h1>Hi {username}!</h1>
              <h2>About our Music Platform!</h2>
              <h4>
                This is a lightweight Music App where you can add your favourite
                songs and listen on the go!
              </h4>
              <h4>
                Add your favourite songs, delete songs, update your songs, add
                them into a playlist and a lot more...
              </h4>
              <br />
              <br />
              <h2>Hop in and experience this new app like never before!</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="success" onClick={handleShow}>
                Know About Developer!
              </Button>
            </Col>
            <Modal
              show={show}
              onHide={handleClose}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Developer's Info
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div id="info">
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>Nikhil Raj</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        MERN Stack Developer
                      </Card.Subtitle>
                      <Card.Text>
                        <h4 style={{ color: "black" }}>Skills:</h4>
                        <p>
                          HTML, CSS, JavaScript, ES6, React.js, Redux, TDD,
                          Node.js, Express.js, MongoDB, Git{" "}
                        </p>
                      </Card.Text>
                      <Card.Link
                        href="https://github.com/Nick-Rj"
                        target="_blank"
                      >
                        GitHub
                      </Card.Link>
                      <Card.Link
                        href="https://www.linkedin.com/in/nikhil-raj-289b0a171"
                        target="_blank"
                      >
                        LinkedIn
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </Container>
      </AnimateAbout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userState: state.user,
  };
};

export default connect(mapStateToProps, {})(About);
