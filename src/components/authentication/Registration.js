import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { withRouter, Prompt } from "react-router";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { registerUser, getAllUsers } from "../../redux/store";
import { connect } from "react-redux";
import "../../assets/styles/Registration.css";
import styled, { keyframes } from "styled-components";
import { bounceIn } from "react-animations";

const AnimateRegistration = styled.div`
  animation: 1.5s ${keyframes`${bounceIn}`};
`;

const Registration = withRouter(
  ({ history, userState, registerUser, getAllUsers }) => {
    // const destination = useHistory();
    // const [showPrompt, setShowPrompt] = useState(false);
    const [userObj, setUserObj] = useState({});

    const [show, setShow] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      getAllUsers();
    }, []);

    const checkUser = (user) => {
      let emails = userState.users.map((user) => user.email);
      if (emails.indexOf(user.email) === -1) {
        return true;
      } else {
        return false;
      }
    };
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        location: "",
        phone: 0,
        email: "",
        password: "",
      },

      validationSchema: Yup.object({
        firstName: Yup.string().required("Please enter your first name!"),
        lastName: Yup.string().required("Please enter your last name!"),
        location: Yup.string().required("Please enter your location!"),
        phone: Yup.number().required("Please enter your phone number"),
        email: Yup.string()
          .email("Please enter a valid email!")
          .required("Please enter your email!"),
        password: Yup.string()
          .min(5, "Minimum character length is 5")
          .required("Please enter the password"),
      }),

      onSubmit: (values) => {
        if (checkUser(values) === false) {
          alert("User already exists, please login");
        } else {
          setUserObj(values);
          setIsSubmitted(true);
          handleShow();
        }
      },
    });

    const handleRegister = () => {
      registerUser(userObj);
      history.push("/userConfirm");
    };
    return (
      <div className="Registration">
        <Prompt
          when={
            (formik.values.firstName.length > 0 ||
              formik.values.lastName.length > 0 ||
              formik.values.location.length > 0 ||
              formik.values.phone !== 0 ||
              formik.values.email.length > 0 ||
              formik.values.password.length > 0) &&
            isSubmitted === false
          }
          message="There are unsaved data. Are you sure?"
        />
        <Container id="header">
          <Row>
            <Col>
              <Link to="/songsLibrary">
                <Button variant="warning" id="backToLib">
                  Back to Songs
                </Button>
              </Link>
            </Col>
            <Col className="hide-element"></Col>
            <Col>
              <h4 className="hide-element">Already a user?</h4>
              <Link to="/Login">
                <Button variant="success" id="signin">
                  Login
                </Button>
              </Link>
            </Col>
            <Col className="show-element" xs={2}></Col>
          </Row>
        </Container>
        <AnimateRegistration>
          <Container>
            <Row>
              <h1>Hey Buddy, Let's get connected!</h1>
              <Col></Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                {" "}
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Row className="mb-1">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik101"
                      className="position-relative"
                    >
                      <FloatingLabel
                        controlId="floatingInput1"
                        label="First Name"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="First name"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.firstName}
                          isValid={
                            formik.touched.firstName && !formik.errors.firstName
                          }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.firstName}
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
                        controlId="floatingInput2"
                        label="Last Name"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.lastName}
                          isValid={
                            formik.touched.lastName && !formik.errors.lastName
                          }
                        />

                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.lastName}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik103"
                      className="position-relative"
                    >
                      <FloatingLabel
                        controlId="floatingInput3"
                        label="Location"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Location"
                          name="location"
                          value={formik.values.location}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.location}
                          isValid={
                            formik.touched.location && !formik.errors.location
                          }
                        />

                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.location}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik104"
                      className="position-relative"
                    >
                      <FloatingLabel
                        controlId="floatingInput4"
                        label="Phone"
                        className="mb-2"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Phone"
                          name="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.phone}
                          isValid={formik.touched.phone && !formik.errors.phone}
                        />

                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.phone}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik105"
                      className="position-relative"
                    >
                      <FloatingLabel
                        controlId="floatingInput5"
                        label="Email"
                        className="mb-2"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.email}
                          isValid={formik.touched.email && !formik.errors.email}
                        />

                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                      className="position-relative"
                    >
                      <FloatingLabel
                        controlId="floatingInput6"
                        label="Password"
                        className="mb-2"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.password}
                          isValid={
                            formik.touched.password && !formik.errors.password
                          }
                        />

                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Button type="submit" name="submit" variant="success">
                    Sign up
                  </Button>
                </Form>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Register User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Your account will be created. Are all your details correct?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        handleClose();
                        setIsSubmitted(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="success" onClick={handleRegister}>
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </AnimateRegistration>
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    userState: state.user,
  };
};

export default connect(mapStateToProps, { registerUser, getAllUsers })(
  Registration
);
