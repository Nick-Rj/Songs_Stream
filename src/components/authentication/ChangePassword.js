import React, { useState } from "react";
import "../../assets/styles/ChangePassword.css";
import { updateUser } from "../../redux/store";
import {
  Button,
  Row,
  Col,
  FloatingLabel,
  Container,
  Form,
  Modal,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, withRouter, Prompt } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import { bounceIn } from "react-animations";
import { connect } from "react-redux";

const AnimateChangePassword = styled.div`
  animation: 1.5s ${keyframes`${bounceIn}`};
`;

const ChangePassword = withRouter(({ history, userData, updateUser }) => {
  let userObj = { ...userData.user };
  const [show, setShow] = useState(false);
  const [userObject, setUserObject] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    document.getElementById("currentPass").style.display = "none";
    document.getElementById("newPass").style.display = "block";
  };

  const handleUpdatePassword = () => {
    updateUser(userObj.id, userObject);
    history.push("/profileView");
  };

  const currentPassword = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter your current password!"),
    }),
    onSubmit: (values) => {
      if (values.password === userObj.password) {
        alert("Verified!");
        setIsValidated(true);
        handleConfirm();
      } else {
        alert("Please enter correct password!");
      }
    },
  });

  const newPassword = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string().required("Please enter new password."),
      confirmPassword: Yup.string().required("Please re-enter the password."),
    }),
    onSubmit: (values) => {
      if (values.password === userObj.password) {
        alert("Entered password is same as your current password!");
      } else if (values.password === values.confirmPassword) {
        userObj = {
          ...userObj,
          password: values.password,
        };

        setUserObject(userObj);
        handleShow();
        setIsValidated(false);
      } else {
        alert("Passwords are not same!");
      }
    },
  });

  return (
    <div className="ChangePassword">
      <Prompt
        when={isValidated === true}
        message="You are closing password window without changing password. Are you sure?"
      />
      <Container id="header">
        <Row>
          <Col>
            <Link to="/profileView">
              <Button variant="warning" id="backToLib">
                Back to User Profile
              </Button>
            </Link>
          </Col>
          <Col xs={2} lg={4}></Col>
          <Col xs={2} lg={4}></Col>
        </Row>
      </Container>

      <AnimateChangePassword id="currentPass">
        <Container>
          <Row>
            <h1>Enter your current password</h1>
            <Col></Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              {" "}
              <Form noValidate onSubmit={currentPassword.handleSubmit}>
                <Row className="mb-1">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormik101"
                    className="position-relative"
                  >
                    <FloatingLabel
                      controlId="floatingInput1"
                      label="Current Password"
                      className="mb-2"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Current Password"
                        name="password"
                        value={currentPassword.values.password}
                        onChange={currentPassword.handleChange}
                        isInvalid={currentPassword.errors.password}
                        isValid={
                          currentPassword.touched.password &&
                          !currentPassword.errors.password
                        }
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {currentPassword.errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Button type="submit" name="submit" variant="success">
                  Validate
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </AnimateChangePassword>
      <AnimateChangePassword id="newPass">
        <Container>
          <Row>
            <h1>Enter the new password</h1>
            <Col></Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              {" "}
              <Form noValidate onSubmit={newPassword.handleSubmit}>
                <Row className="mb-1">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormik101"
                    className="position-relative"
                  >
                    <FloatingLabel
                      controlId="floatingInput2"
                      label="Enter Password"
                      className="mb-2"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={newPassword.values.password}
                        onChange={newPassword.handleChange}
                        isInvalid={newPassword.errors.password}
                        isValid={
                          newPassword.touched.password &&
                          !newPassword.errors.password
                        }
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {newPassword.errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-1">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <FloatingLabel
                      controlId="floatingInput3"
                      label="Confirm Password"
                      className="mb-2"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={newPassword.values.confirmPassword}
                        onChange={newPassword.handleChange}
                        isInvalid={newPassword.errors.confirmPassword}
                        isValid={
                          newPassword.touched.confirmPassword &&
                          !newPassword.errors.confirmPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {newPassword.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Button type="submit" name="submit" variant="success">
                  Change Password
                </Button>
              </Form>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Your account password will be changed. Are you sure?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsValidated(true);
                      handleClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="success" onClick={handleUpdatePassword}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </AnimateChangePassword>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, { updateUser })(ChangePassword);
