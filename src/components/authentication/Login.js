import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getAllUsers,
  userLoginSuccess,
  clearAllUsers,
} from "../../redux/store";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/Login.css";
import styled, { keyframes } from "styled-components";
import {
  pulse,
  tada,
  lightSpeedIn,
  rollIn,
  bounceIn,
  rubberBand,
  fadeIn,
} from "react-animations";

const AnimateLogin = styled.div`
  animation: 1.5s ${keyframes`${rubberBand}`};
`;

const Login = withRouter(
  ({ history, userData, getAllUsers, userLoginSuccess, clearAllUsers }) => {
    console.log("Inside Login", userData);
    useEffect(() => {
      getAllUsers();
    }, []);
    console.log("Inside Login after useEffect", userData);
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required(),
      }),

      onSubmit: (values) => {
        let emails = userData.users.map((user) => user.email);
        let user = userData.users[emails.indexOf(values.email)];
        console.log(emails);
        if (emails.indexOf(values.email) === -1) {
          alert("User not found! Please sign up");
        } else {
          if (user.password === values.password) {
            alert("Login Successful!");
            console.log("After login", userData);
            userLoginSuccess(user);
            clearAllUsers();
            console.log("After login", userData);
            history.push("/songsLibrary");
          } else {
            alert("Invalid Password");
          }
        }
        console.log("After login", userData);
      },
    });
    return (
      <div className="Login">
        <Container>
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
              <h4 className="hide-element">New user?</h4>
              <Link to="/register">
                <Button variant="success" id="signup">
                  Sign Up
                </Button>
              </Link>
            </Col>
            <Col className="show-element" xs={2}></Col>
          </Row>
        </Container>
        <AnimateLogin>
          <Container>
            <Row>
              <h1 id="heading">Hey Buddy, Get into the Stream!</h1>
              <Col></Col>
              <Col xs={12} sm={12} md={12} lg={4}>
                {" "}
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik101"
                      className="position-relative"
                    >
                      <FloatingLabel
                        controlId="floatingInput1"
                        label="Email"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.email}
                          isValid={formik.touched.email && !formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik102"
                      className="position-relative"
                    >
                      <FloatingLabel
                        controlId="floatingInput2"
                        label="Password"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.password}
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
                  <Button
                    type="submit"
                    name="submit"
                    size="lg"
                    variant="success"
                  >
                    Login
                  </Button>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </AnimateLogin>
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, {
  getAllUsers,
  userLoginSuccess,
  clearAllUsers,
})(Login);
