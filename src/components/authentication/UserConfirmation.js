import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearCurrentUser } from "../../redux/store";
import "../../assets/styles/UserConfirmation.css";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const AnimateRegisterConfirm = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`;

function UserConfirmation({ userData, clearCurrentUser }) {
  const variants = [
    "Primary",
    "Secondary",
    "Success",
    "Danger",
    "Info",
    "Light",
    "Dark",
  ];

  const random = Math.floor(Math.random() * variants.length);
  const selectedVariant = variants[random];

  const [user, setUser] = useState(userData.user);

  return (
    <div className="UserConfirmation">
      <AnimateRegisterConfirm>
        <Container>
          <Row>
            <Col xs={1}></Col>
            <Col>
              {" "}
              <Card
                bg={selectedVariant.toLowerCase()}
                text={
                  selectedVariant.toLowerCase() === "light" ? "dark" : "white"
                }
                className="mb-2 profile-card"
              >
                <Card.Header>User Profile</Card.Header>
                <Card.Body>
                  <Card.Title>Here are your details! </Card.Title>
                  <Card.Text>
                    <Container>
                      <Row>
                        <Col>
                          <p>First Name: {userData.user.firstName}</p>
                          <p>Last Name: {userData.user.lastName}</p>
                          <p>Location: {userData.user.location}</p>
                          <p>Phone: {userData.user.phone}</p>
                          <p>Email: {userData.user.email}</p>

                          <Link to="/login">
                            <Button
                              variant={
                                selectedVariant.toLowerCase() === "success"
                                  ? "danger"
                                  : "success"
                              }
                            >
                              Login
                            </Button>
                          </Link>
                          <Link to="/songsLibrary">
                            <Button
                              variant={
                                selectedVariant.toLowerCase() === "warning"
                                  ? "light"
                                  : "warning"
                              }
                              onClick={clearCurrentUser}
                            >
                              Go to Songs Library
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
      </AnimateRegisterConfirm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, { clearCurrentUser })(UserConfirmation);
