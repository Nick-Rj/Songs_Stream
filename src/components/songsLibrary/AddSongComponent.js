import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "../../assets/styles/AddSongComponent.css";
import { useFormik } from "formik";
import { withRouter } from "react-router";
import { addSong } from "../../redux/store";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { bounceIn } from "react-animations";

const AnimateAddSong = styled.div`
  animation: 1.5s ${keyframes`${bounceIn}`};
`;

const AddSongComponent = withRouter(
  ({ history, songsData, userData, addSong }) => {
    useEffect(() => {
      console.log("Inside Add SOng", songsData);
      console.log("Inside Add Song: Update", userData);
    }, []);

    const [show, setShow] = useState(false);
    const [songObj, setSongObj] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddSong = () => {
      addSong(songObj);
      alert(`${songObj.title} added successfully!`);
      history.push("/songsLibrary");
    };

    const formik = useFormik({
      initialValues: {
        title: "",
        album_movie: "",
        singer: "",
        length: "",
        genre: "",
        url: "",
        added_by: userData.user.email,
      },
      validationSchema: Yup.object({
        title: Yup.string().required("Song title is required"),
        album_movie: Yup.string().required("Album/Movie is required"),
        singer: Yup.string().required("Singer/Band name is required"),
        length: Yup.string().required("Song length is required"),
        genre: Yup.string().required("Genre is required"),
        url: Yup.string(),
      }),

      onSubmit: (values) => {
        console.log("Values before adding", values);
        setSongObj(values);
        setIsSubmitted(true);
        handleShow();
      },
    });
    return (
      <div className="AddSongComponent">
        <Prompt
          when={
            (formik.values.title.length > 0 ||
              formik.values.album_movie.length > 0 ||
              formik.values.singer.length > 0 ||
              formik.values.length.length > 0 ||
              formik.values.genre.length > 0 ||
              formik.values.url.length > 0) &&
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
            <Col xs={2} lg={4}></Col>
            <Col xs={2} lg={4}></Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <h1>Hey Buddy, Add a new song!</h1>
            <Col></Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              <AnimateAddSong>
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
                        label="Song Title"
                        className="mb-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Song Title"
                          name="title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.title}
                          isValid={formik.touched.title && !formik.errors.title}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.title}
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
                        label="Album/Movie Name"
                        className="mb-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Album/Movie Name"
                          name="album_movie"
                          value={formik.values.album_movie}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.album_movie}
                          isValid={
                            formik.touched.album_movie &&
                            !formik.errors.album_movie
                          }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.album_movie}
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
                        label="Singer"
                        className="mb-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Singer"
                          name="singer"
                          value={formik.values.singer}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.singer}
                          isValid={
                            formik.touched.singer && !formik.errors.singer
                          }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.singer}
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
                        label="Song Length"
                        className="mb-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Song Length"
                          name="length"
                          value={formik.values.length}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.length}
                          isValid={
                            formik.touched.length && !formik.errors.length
                          }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.length}
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
                        label="Genre"
                        className="mb-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Genre"
                          name="genre"
                          value={formik.values.genre}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.genre}
                          isValid={formik.touched.genre && !formik.errors.genre}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.genre}
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
                        controlId="floatingInput"
                        label="Song URL"
                        className="mb-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Song URL"
                          name="url"
                          value={formik.values.url}
                          onChange={formik.handleChange}
                          isInvalid={formik.errors.url}
                          isValid={formik.touched.url && !formik.errors.url}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.url}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Button type="submit" name="submit" variant="success">
                    Add Song
                  </Button>
                </Form>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Song</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {songObj.title} will be added to Songs Library.
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
                    <Button variant="success" onClick={handleAddSong}>
                      Add Song
                    </Button>
                  </Modal.Footer>
                </Modal>
              </AnimateAddSong>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    songsData: state.song,
    userData: state.user,
  };
};

export default connect(mapStateToProps, { addSong })(AddSongComponent);
