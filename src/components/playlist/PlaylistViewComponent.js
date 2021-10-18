import React, { Suspense, useState } from "react";
import { connect } from "react-redux";
import { updatePlaylist } from "../../redux/store";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
  Accordion,
} from "react-bootstrap";
import "../../assets/styles/PlaylistViewComponent.css";
import { Link, useHistory } from "react-router-dom";

import usePlaylistDataRetriever from "../utilities/usePlaylistDataRetriever";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

import LoaderAnimation from "../utilities/LoaderAnimation";

const AnimatePlaylistView = styled.div`
  animation: 2.5s ${keyframes`${fadeIn}`};
`;

const SongComponent = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("../songsLibrary/SongComponent"));
    }, 5000);
  });
});

const PlaylistViewComponent = ({
  match,
  songData,
  userData,
  playlistData,
  updatePlaylist,
  ...props
}) => {
  const songsData = props.location.state || {};

  const [playlist, songsResult, error] = usePlaylistDataRetriever(
    match.params.id,
    songsData
  );

  const [searchData, setSearchData] = useState("");

  const filterSongs = (song, query) => {
    return song.title.toLowerCase().includes(query.toLowerCase());
  };

  let filteredSongs = songData.songs;
  const handleSearchChange = (data) => {
    setSearchData(data);
  };
  filteredSongs =
    searchData === ""
      ? songsResult
      : songsResult.filter((song) => filterSongs(song, searchData));

  const RouteHandler = useHistory();
  const handleFetchData = (destination) => {
    RouteHandler.push({
      pathname: `/playlists/${match.params.id}/${destination}`,
      state: [playlist, songsResult],
    });
  };

  const topPlaylistsHandler = () => {
    RouteHandler.push({
      pathname: "/topPlaylists",
      state: [playlist.id, playlistData.playlists],
    });
  };

  return (
    <div className="PlaylistViewComponent">
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
      <AnimatePlaylistView>
        <Container>
          <Row>
            <Col>
              <h1>Playlist: {playlist.title}</h1>
            </Col>
          </Row>

          <Row className="featureBtns">
            <Col xs={12} sm={6} lg={6} className="btnCols">
              <Button
                variant="success"
                onClick={() => handleFetchData("addSongs")}
                style={{ marginRight: "1rem" }}
              >
                Add Songs
              </Button>

              <Button
                variant="danger"
                onClick={() => handleFetchData("deleteSongs")}
              >
                Delete Songs
              </Button>
            </Col>
            <Col xs={12} sm={6} className="btnCols">
              <Button variant="warning" onClick={() => topPlaylistsHandler()}>
                Top Playlists
              </Button>
            </Col>
          </Row>
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

          <Suspense fallback={<LoaderAnimation />}>
            <Row>
              <Col>
                {error !== null || songsResult.length === 0 ? (
                  <h2>Oops! No Songs Found!</h2>
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
                                  isSongsLibrary={false}
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
      </AnimatePlaylistView>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songData: state.song,
    userData: state.user,
    playlistData: state.playlist,
  };
};

export default connect(mapStateToProps, { updatePlaylist })(
  PlaylistViewComponent
);
