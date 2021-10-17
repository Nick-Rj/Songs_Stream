import React, { useState } from "react";
import { connect } from "react-redux";
import "../../assets/styles/ProfileView.css";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { deleteUser } from "../../redux/store";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const AnimateRegisterConfirm = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`;

const ProfileView = withRouter(({ history, userData, deleteUser }) => {
  const variants = [
    "Primary",
    "Secondary",
    "Success",
    "Danger",
    "Light",
    "Dark",
  ];

  const random = Math.floor(Math.random() * variants.length);
  const selectedVariant = variants[random];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteUser = () => {
    deleteUser(userData.user.id);
    alert("User deleted successfully!");
    history.push("/songsLibrary");
  };
  return (
    <div className="ProfileView">
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
      <AnimateRegisterConfirm>
        <Container className="profile-card">
          <Row>
            <Col xs={1}></Col>
            <Col>
              {" "}
              <Card
                bg={selectedVariant.toLowerCase()}
                text={
                  selectedVariant.toLowerCase() === "light" ? "dark" : "white"
                }
                className="mb-2"
              >
                <Card.Header>User Profile</Card.Header>
                <Card.Body>
                  <Card.Title>Here are your details! </Card.Title>
                  <Card.Text>
                    <Container>
                      <Row>
                        <Col>
                          <div
                            style={{
                              color: `${
                                selectedVariant.toLowerCase() === "light"
                                  ? "black"
                                  : "white"
                              }`,
                            }}
                          >
                            <p>First Name: {userData.user.firstName}</p>
                            <p>Last Name: {userData.user.lastName}</p>
                            <p>Location: {userData.user.location}</p>
                            <p>Phone: {userData.user.phone}</p>
                            <p>Email: {userData.user.email}</p>
                          </div>
                          <Link to="/editUser">
                            <Button
                              variant={
                                selectedVariant.toLowerCase() === "success"
                                  ? "secondary"
                                  : "success"
                              }
                            >
                              Edit Details
                            </Button>
                          </Link>
                          <Link to="/changePassword">
                            <Button
                              variant={
                                selectedVariant.toLowerCase() === "warning"
                                  ? "light"
                                  : "warning"
                              }
                            >
                              Change Password
                            </Button>
                          </Link>
                          <Button
                            variant={
                              selectedVariant.toLowerCase() === "danger"
                                ? "secondary"
                                : "danger"
                            }
                            onClick={handleShow}
                          >
                            Delete User
                          </Button>

                          <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Delete User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Your account will be deleted permanently. Are you
                              sure?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Cancel
                              </Button>
                              <Button
                                variant="danger"
                                onClick={handleDeleteUser}
                              >
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
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
});

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, { deleteUser })(ProfileView);
