import React, { Component } from "react";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import "../../assets/styles/AddSongsToPlaylist.css";
import "../../assets/styles/ScrollbarStyles.css";
import { connect } from "react-redux";
import { Link, withRouter, Prompt } from "react-router-dom";
import { updatePlaylist } from "../../redux/store";
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

const AnimateAddSongsToPlaylist = styled.div`
  animation: 1.5s ${keyframes`${rubberBand}`};
`;

export class AddSongsToPlaylist extends Component {
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
    console.log("Playlist title inside add songs", this.state.playlist);
    console.log("All songs inside playlist", this.state.songsFromPlaylist);
    console.log("Current ID", this.props.match.params.id);
  }

  // componentDidMount() {
  //   this.setState({
  //     songs: [...songsFromPlaylist.map((song) => song.title)],
  //   });
  // }

  componentDidUpdate() {
    console.log("Updated State", this.state.songs);
    console.log("Playlist ID", this.props.match.params.id);
    // if (this.state.songsFromPlaylist.length === 0)
    //   this.setState({
    //     songs: this.removeDuplicateSongsFromArray([
    //       ...this.state.songs,
    //       ...this.state.songsFromPlaylist.map((song) => song.title),
    //     ]),
    //   });
    // console.log("Updated list of songs in state", this.state.songs);
  }

  backtoPlaylist() {
    this.props.history.push({
      pathname: `/playlists/${this.props.match.params.id}`,
      state: this.props.songData,
    });
  }

  removeDuplicateSongsFromArray(arr) {
    return [...new Set(arr)];
  }

  onChange = (event) => {
    // console.log(event.target.checked);

    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({ songs: [...this.state.songs, event.target.value] });
      console.log("Adding songs to list", this.state.songs);
    } else {
      const index = this.state.songs.indexOf(event.target.value);
      this.state.songs.splice(index, 1);
      this.setState({ songs: this.state.songs });
      console.log("After removing songs", this.state.songs);
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
      console.log("All songs to be added", this.state.songs);
      let tempIndexes = [];

      const songsToBeAdded = [
        ...this.state.songsFromPlaylist.map((song) => song.title),
        ...this.state.songs,
      ];

      for (let i = 0; i < songsToBeAdded.length; i++) {
        tempIndexes.push(songNames.indexOf(songsToBeAdded[i]));
      }

      let songsIDs = [];

      for (let i = 0; i < tempIndexes.length; i++) {
        songsIDs.push(this.props.songData.songs[tempIndexes[i]].id);
      }

      songsIDs = this.removeDuplicateSongsFromArray(songsIDs);
      console.log("All song ids to be added", songsIDs);

      this.setState({ songsIDs: songsIDs });
      this.setState({ isSubmitted: true });
      this.handleShow();
      // for (let i = 0; i < songsIDs.length; i++) {
      //   this.props.deleteSong(songsIDs[i]);
      // }

      // this.props.getAllSongs();

      // //   this.props.onHide()
      // this.props.history.push("/songsLibrary");
    }
  };

  handleAdd = () => {
    const playlist = {
      title: this.state.playlist.title,
      songsIDs: this.state.songsIDs,
      accessCount: this.state.playlist.accessCount,
    };

    if (this.state.songsIDs === this.state.playlist.songsIDs) {
      alert("No new songs added!");
    } else {
      this.props.updatePlaylist(this.props.match.params.id, playlist);
    }

    this.backtoPlaylist();
  };

  render() {
    return (
      <div className="AddSongsToPlaylist">
        <Prompt
          when={
            this.state.songs.length !== 0 && this.state.isSubmitted === false
          }
          message="There are some songs selected. Do you want to quit without adding?"
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
          <AnimateAddSongsToPlaylist>
            <Row>
              <Col></Col>
              <Col xs={12} sm={12} lg={4}>
                <div className="scrollbar scrollbar-dusty-grass">
                  <ListGroup>
                    {this.props.songData.songs.map((song) => {
                      return (
                        <ListGroup.Item
                          key={song.id}
                          style={{ width: "100%" }}
                          variant="success"
                        >
                          <span style={{ float: "left" }}>
                            <input
                              type="checkbox"
                              // id={`custom-checkbox-${song.id}`}
                              name={song.title}
                              value={song.title}
                              // checked={checkedState[song.id]}
                              onChange={this.onChange}
                              // onClick={changeHandler}
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
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="success"
                  onClick={this.handleCheck}
                  style={{ marginTop: "1rem" }}
                >
                  Add Songs
                </Button>
                <Modal
                  show={this.state.show}
                  onHide={this.handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Multiple Songs to Playlist</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    These songs will be added to playlist. Are you sure?
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
                    <Button variant="success" onClick={this.handleAdd}>
                      Add Songs
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          </AnimateAddSongsToPlaylist>
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
  withRouter(AddSongsToPlaylist)
);
