import React, { useState } from "react";
import { connect } from "react-redux";
import "../../assets/styles/EditUserData.css";
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

const AnimateProfileUpdate = styled.div`
  animation: 1.5s ${keyframes`${bounceIn}`};
`;

const EditUserData = withRouter(({ history, userData, updateUser }) => {
  const [show, setShow] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateUser = () => {
    updateUser(userData.user.id, userObj);
    history.push("/profileView");
  };
  const formik = useFormik({
    initialValues: {
      firstName: userData.user.firstName,
      lastName: userData.user.lastName,
      location: userData.user.location,
      phone: userData.user.phone,
      email: userData.user.email,
      password: userData.user.password,
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
      const userObj = { ...userData.user };

      if (
        values.firstName === userObj.firstName &&
        values.lastName === userObj.lastName &&
        values.location === userObj.location &&
        values.phone === userObj.phone
      ) {
        alert("No changes found!");
      } else {
        setUserObj(values);
        setIsSubmitted(true);
        handleShow();
      }
    },
  });

  return (
    <div className="EditUserData">
      <Prompt
        when={
          (formik.values.firstName !== userData.user.firstName ||
            formik.values.lastName !== userData.user.lastName ||
            formik.values.location !== userData.user.location ||
            formik.values.phone !== userData.user.phone ||
            formik.values.email !== userData.user.email ||
            formik.values.password !== userData.user.password) &&
          isSubmitted === false
        }
        message="There are unsaved data. Are you sure?"
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
      <AnimateProfileUpdate>
        <Container>
          <Row>
            <h1>Hey Buddy, Update your profile!</h1>
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
                      controlId="floatingInput"
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
                      controlId="floatingInput"
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
                      controlId="floatingInput"
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
                      controlId="floatingInput"
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
                      controlId="floatingInput"
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
                        disabled
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Button type="submit" name="submit" variant="success">
                  Update Profile
                </Button>
              </Form>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Your account will be updated. Are you sure?
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
                  <Button variant="success" onClick={handleUpdateUser}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </AnimateProfileUpdate>
    </div>
  );
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, { updateUser })(EditUserData);
