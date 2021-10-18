import React, { Component } from "react";
import { Container, Row, Button, Col, Modal, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Prompt } from "react-router-dom";
import { updatePlaylist } from "../../redux/store";
import styled, { keyframes } from "styled-components";
import { rubberBand } from "react-animations";
import "../../assets/styles/DeleteSongsFromPlaylist.css";
import "../../assets/styles/ScrollbarStyles.css";

const AnimateDeleteSongsFromPlaylist = styled.div`
  animation: 1.5s ${keyframes`${rubberBand}`};
`;

export class DeleteSongsFromPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: this.props.location.state[0] || "",
      songsFromPlaylist: this.props.location.state[1] || [],
      songs: [],
      show: false,
      songsIDs: [],
      isSubmitted: false,
    };

    this.backtoPlaylist = this.backtoPlaylist.bind(this);
  }

  backtoPlaylist() {
    this.props.history.push({
      pathname: `/playlists/${this.props.match.params.id}`,
      state: this.props.songData,
    });
  }

  componentDidUpdate() {}

  onChange = (event) => {
    // console.log(event.target.checked);

    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({ songs: [...this.state.songs, event.target.value] });
    } else {
      const index = this.state.songs.indexOf(event.target.value);
      this.state.songs.splice(index, 1);
      this.setState({ songs: this.state.songs });
    }
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleCheck = () => {
    if (this.state.songs.length === 0) {
      alert("No songs selected...");
    } else {
      const songNames = this.props.songData.songs.map((song) => song.title);
      let tempIndexes = [];
      for (let i = 0; i < this.state.songs.length; i++) {
        tempIndexes.push(songNames.indexOf(this.state.songs[i]));
      }

      let songsIDs = [];

      for (let i = 0; i < tempIndexes.length; i++) {
        songsIDs.push(this.props.songData.songs[tempIndexes[i]].id);
      }

      let allSongs = this.state.playlist.songsIDs;
      for (let i = 0; i < songsIDs.length; i++) {
        allSongs.splice(allSongs.indexOf(songsIDs[i]), 1);
      }

      this.setState({ songsIDs: allSongs });
      this.setState({ isSubmitted: true });
      this.handleShow();
    }
  };

  handleDelete = () => {
    const playlist = {
      title: this.state.playlist.title,
      songsIDs: this.state.songsIDs,
      accessCount: this.state.playlist.accessCount,
    };

    this.props.updatePlaylist(this.props.match.params.id, playlist);

    this.backtoPlaylist();
  };

  render() {
    return (
      <div className="DeleteSongsFromPlaylist">
        <Prompt
          when={
            this.state.songs.length !== 0 && this.state.isSubmitted === false
          }
          message="There are some songs selected. Do you want to quit without deleting?"
        />
        <Container id="header">
          <Row>
            <Col>
              <Button
                variant="warning"
                id="backToLib"
                onClick={this.backtoPlaylist}
              >
                Back to Playlist
              </Button>
            </Col>
            <Col xs={2} lg={4}></Col>
            <Col xs={2} lg={4}></Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <h1>Hey Buddy! Add a few songs to playlist...</h1>
            </Col>
          </Row>
          <AnimateDeleteSongsFromPlaylist>
            <Row>
              <Col></Col>
              <Col xs={12} sm={12} lg={4}>
                {this.state.songsFromPlaylist.length === 0 ? (
                  <h1>No Songs Found!</h1>
                ) : (
                  <div className="scrollbar scrollbar-dusty-grass">
                    <ListGroup>
                      {this.state.songsFromPlaylist.map((song) => {
                        return (
                          <ListGroup.Item
                            key={song.id}
                            style={{ width: "100%" }}
                            variant="danger"
                          >
                            <span style={{ float: "left" }}>
                              <input
                                type="checkbox"
                                name={song.title}
                                value={song.title}
                                onChange={this.onChange}
                              />
                            </span>
                            <span style={{ float: "left", marginLeft: "1rem" }}>
                              <label htmlFor={`custom-checkbox-${song.id}`}>
                                {song.title}
                              </label>
                            </span>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </div>
                )}
              </Col>
              <Col></Col>
            </Row>
            {this.state.songsFromPlaylist.length !== 0 && (
              <Row>
                <Col>
                  <Button
                    variant="danger"
                    onClick={this.handleCheck}
                    style={{ marginTop: "1rem" }}
                  >
                    Delete Songs
                  </Button>
                  <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Delete Multiple Songs from Playlist
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      These songs will be deleted from playlist. Are you sure?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          this.handleClose();
                          this.setState({ isSubmitted: false });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={this.handleDelete}>
                        Delete Songs
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            )}
          </AnimateDeleteSongsFromPlaylist>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songData: state.song,
  };
};
export default connect(mapStateToProps, { updatePlaylist })(
  withRouter(DeleteSongsFromPlaylist)
);
