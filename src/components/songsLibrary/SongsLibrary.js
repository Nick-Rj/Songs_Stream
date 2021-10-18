import React, { useEffect, useState, Suspense } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Accordion,
  Spinner,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutSuccess, getAllSongs } from "../../redux/store";
import "../../assets/styles/SongLibrary.css";
import "../../assets/styles/ScrollbarStyles.css";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import LoaderAnimation from "../utilities/LoaderAnimation";
const SongComponent = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./SongComponent"));
    }, 8000);
  });
});

const AnimateSongsLibrary = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`;

const SongsLibrary = ({
  userData,
  songData,
  userLogoutSuccess,
  getAllSongs,
}) => {
  useEffect(() => {
    getAllSongs();
  }, []);

  const [searchData, setSearchData] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterSongs = (song, query) => {
    // console.log("Searched", song.title.toLowerCase());
    return song.title.toLowerCase().includes(query.toLowerCase());
  };

  let filteredSongs = songData.songs;
  const handleSearchChange = (data) => {
    setSearchData(data);
  };
  filteredSongs =
    searchData === ""
      ? songData.songs
      : songData.songs.filter((song) => filterSongs(song, searchData));

  return (
    <div className="SongsLibrary">
      {userData.isLoggedIn === true ? (
        <Container>
          <Row>
            <Col xs={5} lg={2}>
              <Link to="/profileView">
                <Button variant="warning" className="marginTop">
                  Profile View
                </Button>
              </Link>
            </Col>

            <Col xs={4} lg={1}>
              <Link to="/songsLibrary">
                <Button
                  variant="success"
                  onClick={handleShow}
                  className="marginTop"
                >
                  Logout
                </Button>
              </Link>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>You will be logged out. Are you sure?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="warning" onClick={userLogoutSuccess}>
                    Logout
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>

            <Col className="show-element" xs={3}></Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col xs={5} lg={2}>
              <Link to="/register">
                <Button variant="primary" className="marginTop">
                  Sign up
                </Button>
              </Link>
            </Col>

            <Col xs={4} lg={1}>
              <Link to="/login">
                <Button variant="success" className="marginTop">
                  Login
                </Button>
              </Link>
            </Col>

            <Col className="show-element" xs={3}></Col>
          </Row>
        </Container>
      )}
      <AnimateSongsLibrary>
        <Container>
          <Row>
            <Col>
              <h1>Welcome to Songs Library</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {userData.isLoggedIn ? (
                <Container>
                  <Row>
                    <Col>
                      <ul id="myList">
                        <li className="inline-item">
                          <Link to="/addSong">
                            <Button variant="success">Add Song</Button>
                          </Link>
                        </li>
                        <li className="inline-item">
                          <Link to="/deleteMultipleSongs">
                            <Button variant="danger">Delete Songs</Button>
                          </Link>
                        </li>
                      </ul>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Container>
              ) : (
                <Container>
                  <Row>
                    <Col>
                      <p>
                        Note- Please login for adding, updating and deleting
                        songs
                      </p>
                    </Col>
                  </Row>
                </Container>
              )}
            </Col>
          </Row>
          <Row>
            <Container>
              <Row>
                <Col></Col>
                <Col xs={12} sm={12} lg={6}>
                  <Form>
                    <Form.Group className="mb-1">
                      <FloatingLabel label="Search" className="mb-1">
                        <Form.Control
                          id="searchData"
                          type="text"
                          placeholder="song name"
                          value={searchData}
                          onChange={(event) =>
                            handleSearchChange(event.target.value)
                          }
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Row>
          <Suspense fallback={<LoaderAnimation />}>
            <Row className="SongContainer">
              <Col>
                {songData.loading ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading Songs...
                  </Button>
                ) : songData.error ? (
                  <h2>Oops! No songs found!</h2>
                ) : (
                  <div className="scrollbar scrollbar-dusty-grass">
                    <div className="force-overflow">
                      <Accordion defaultActiveKey="">
                        {filteredSongs.length === 0 ? (
                          <h2>Oops! No Songs Found!</h2>
                        ) : (
                          filteredSongs.map((song) => (
                            <Accordion.Item eventKey={song.id} key={song.id}>
                              <Accordion.Header>
                                <span className="left">{song.title}</span>{" "}
                                <span className="right hide-element">
                                  {song.length}
                                </span>
                              </Accordion.Header>

                              <Accordion.Body>
                                <SongComponent
                                  song={song}
                                  userLoggedInStatus={userData.isLoggedIn}
                                  isSongsLibrary={true}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          ))
                        )}
                      </Accordion>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Suspense>
        </Container>
      </AnimateSongsLibrary>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    songData: state.song,
  };
};

export default connect(mapStateToProps, { userLogoutSuccess, getAllSongs })(
  SongsLibrary
);
