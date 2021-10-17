import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "../../assets/styles/ScrollbarStyles.css";
import "../../assets/styles/ManagePlaylists.css";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getAllPlaylists,
  addPlaylist,
  deletePlaylist,
} from "../../redux/store";

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

const AnimateManagePlaylists = styled.div`
  animation: 4s ${keyframes`${fadeIn}`};
`;

const ManagePlaylists = withRouter(
  ({ playlistData, getAllPlaylists, addPlaylist, deletePlaylist }) => {
    useEffect(() => {
      getAllPlaylists();
      console.log("All the playlists", playlistData);
    }, []);

    //   let viewData = null;
    //   if (playlistData.playlists === undefined) {
    //     viewData = <h2>Oops! No Playlists Found</h2>;
    //   } else {
    //     viewData = playlistData.playlists.map((playlist) => (
    //       <Card style={{ width: "100%" }}>
    //         <Card.Body>
    //           <Card.Title>{playlist.title}</Card.Title>
    //           <Card.Subtitle className="mb-2 text-muted">
    //             Card Subtitle
    //           </Card.Subtitle>

    //           <Card.Link href="#">Card Link</Card.Link>
    //           <Card.Link href="#">Another Link</Card.Link>
    //         </Card.Body>
    //       </Card>
    //     ));
    //   }
    const colors = [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info",
      "dark",
    ];

    const [playlist, setPlaylist] = useState("");
    const [searchData, setSearchData] = useState("");
    const handlePlaylistChange = (e) => {
      setPlaylist(e.target.value);
    };

    const viewAddPlaylist = () => {
      document.getElementById("addPlaylistButton").style.display = "none";
      document.getElementById("addPlaylistForm").style.display = "block";
    };

    const handleAddPlaylist = (e) => {
      e.preventDefault();
      const playlistResult = {
        title: playlist,
        songsIDs: [],
        accessCount: 0,
      };
      if (playlist === "") {
        alert("Please enter playlist name!");
      } else {
        alert(`${playlist} added!`);
        addPlaylist(playlistResult);
        setPlaylist("");
        document.getElementById("playlistInput").value = "";
        document.getElementById("addPlaylistButton").style.display = "block";
        document.getElementById("addPlaylistForm").style.display = "none";
      }
    };

    const cancelAddPlaylist = () => {
      document.getElementById("addPlaylistButton").style.display = "block";
      document.getElementById("addPlaylistForm").style.display = "none";
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeletePlaylist = (playlist) => {
      alert(`${playlist.title} delete successfully!`);
      deletePlaylist(playlist.id);

      handleClose();
    };

    const filterPlaylists = (playlist, query) => {
      return playlist.title.toLowerCase().includes(query.toLowerCase());
    };

    let filteredPlaylists = playlistData.playlists;
    const handleSearchChange = (data) => {
      setSearchData(data);
    };

    filteredPlaylists =
      searchData === ""
        ? playlistData.playlists
        : playlistData.playlists.filter((playlist) =>
            filterPlaylists(playlist, searchData)
          );
    return (
      <div className="ManagePlaylists">
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
        <AnimateManagePlaylists>
          <Container>
            <Row>
              <Col>
                <h1>Here goes all the playlists</h1>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} lg={6}>
                <Button
                  variant="success"
                  onClick={viewAddPlaylist}
                  id="addPlaylistButton"
                >
                  Add Playlist
                </Button>
                <Container id="addPlaylistForm">
                  <Row>
                    <Col>
                      <Form onSubmit={handleAddPlaylist}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Playlist"
                          className="mb-3"
                        >
                          <Form.Control
                            id="playlistInput"
                            type="text"
                            placeholder="Playlist"
                            value={playlist}
                            onChange={handlePlaylistChange}
                          />
                        </FloatingLabel>

                        <Button variant="success" type="submit">
                          Submit
                        </Button>
                        <Button variant="warning" onClick={cancelAddPlaylist}>
                          Cancel
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col xs={12} sm={12} lg={6}>
                <Form style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                  <Form.Group className="mb-1" controlId="search-bar">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Search"
                      className="mb-1"
                    >
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
          <Container>
            <Row>
              <Col>
                {playlistData.playlists === undefined ? (
                  <h2>Oops! No Playlists Found!</h2>
                ) : (
                  <div class="scrollbar scrollbar-dusty-grass">
                    <div class="force-overflow">
                      {filteredPlaylists.length === 0 ? (
                        <h2>Oops! No Playlists Found!</h2>
                      ) : (
                        filteredPlaylists.map((playlist) => (
                          <Card
                            border={
                              colors[Math.floor(Math.random() * colors.length)]
                            }
                            style={{
                              width: "100%",
                              marginBottom: ".5rem",
                              border: "5px solid",
                              borderRadius: ".8rem",
                            }}
                          >
                            <Card.Body>
                              <Container>
                                <Row>
                                  <Col>
                                    <Card.Title>{playlist.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                      Number of Songs:{playlist.songsIDs.length}
                                    </Card.Subtitle>
                                  </Col>
                                  <Col>
                                    <Button
                                      variant="danger"
                                      onClick={handleShow}
                                    >
                                      Delete Playlist
                                    </Button>

                                    <Modal
                                      show={show}
                                      onHide={handleClose}
                                      backdrop="static"
                                      keyboard={false}
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>
                                          Delete Playlist
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        {playlist.title} will be deleted
                                        permanently. Are you sure?
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button
                                          variant="secondary"
                                          onClick={handleClose}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="danger"
                                          onClick={() =>
                                            handleDeletePlaylist(playlist)
                                          }
                                        >
                                          Delete
                                        </Button>
                                      </Modal.Footer>
                                    </Modal>
                                  </Col>
                                </Row>
                              </Container>
                            </Card.Body>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </AnimateManagePlaylists>
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    playlistData: state.playlist,
  };
};

export default connect(mapStateToProps, {
  getAllPlaylists,
  addPlaylist,
  deletePlaylist,
})(ManagePlaylists);
