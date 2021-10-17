import React, { Component } from "react";
import {
  FloatingLabel,
  Container,
  Form,
  Row,
  Button,
  Col,
  Modal,
  ListGroup,
} from "react-bootstrap";
import "../../assets/styles/DeleteMultipleSongsComponent.css";
import { connect } from "react-redux";
import { Link, withRouter, Prompt } from "react-router-dom";
import { deleteSong, getAllSongs } from "../../redux/store";
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

const AnimateDeleteMultipleSongs = styled.div`
  animation: 1.5s ${keyframes`${rubberBand}`};
`;

export class DeleteMultipleSongsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      show: false,
      songsIDs: [],
      searchData: "",
      fitleredSongs: this.props.songData.songs,
      isSubmitted: false,
    };

    console.log("Inside Constructor", this.state.songs);
  }

  filterSongs = (song, query) => {
    return song.title.toLowerCase().includes(query.toLowerCase());
  };

  handleSearchChange = (data) => {
    this.setState({ searchData: data });
    this.setState({
      fitleredSongs:
        this.state.searchData === ""
          ? this.props.songData.songs
          : this.props.songData.songs.filter((song) =>
              this.filterSongs(song, data)
            ),
    });
  };

  // verifyCheck = (event) => {
  //   const value = event.target.value;
  //   for (let i = 0; i < this.state.songs.length; i++) {
  //     if (value === this.state.songs[i]) {
  //       return "true";
  //     }
  //   }
  //   return "false";
  // };

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

      let tempIndexes = [];
      for (let i = 0; i < this.state.songs.length; i++) {
        tempIndexes.push(songNames.indexOf(this.state.songs[i]));
      }

      let songsIDs = [];

      for (let i = 0; i < tempIndexes.length; i++) {
        songsIDs.push(this.props.songData.songs[tempIndexes[i]].id);
      }

      this.setState({ songsIDs: songsIDs });
      this.setState({ isSubmitted: true });
      this.handleShow();
    }
  };

  handleDelete = () => {
    for (let i = 0; i < this.state.songsIDs.length; i++) {
      this.props.deleteSong(this.state.songsIDs[i]);
    }

    this.props.getAllSongs();

    //   this.props.onHide()
    this.props.history.push("/songsLibrary");
  };

  componentDidUpdate() {
    console.log("Updated State", this.state.songs);
  }
  render() {
    return (
      <div className="DeleteMultipleSongsComponent">
        <Prompt
          when={
            this.state.songs.length !== 0 && this.state.isSubmitted === false
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
            <Col>
              <h1>Hey Buddy, Wanna delete a few songs?</h1>
            </Col>
          </Row>
          {/* <Row>
            <Col></Col>
            <Col>
              <Form>
                <Form.Group className="mb-1">
                  <FloatingLabel label="Search" className="mb-1">
                    <Form.Control
                      id="searchData"
                      type="text"
                      placeholder="song name"
                      value={this.state.searchData}
                      onChange={(event) =>
                        this.handleSearchChange(event.target.value)
                      }
                    />
                  </FloatingLabel>
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
          </Row> */}
          <AnimateDeleteMultipleSongs>
            <Row>
              <Col></Col>
              <Col xs={12} sm={12} lg={6}>
                <div className="scrollbar scrollbar-dusty-grass">
                  <ListGroup>
                    {this.state.fitleredSongs.map((song) => {
                      return (
                        <ListGroup.Item
                          key={song.id}
                          style={{ width: "100%" }}
                          variant="danger"
                        >
                          <span>
                            <input
                              type="checkbox"
                              // id={`custom-checkbox-${song.id}`}
                              name={song.title}
                              value={song.title}
                              // checked={this.verifyCheck}
                              onChange={this.onChange}
                              // onClick={changeHandler}
                            />
                          </span>
                          <span>
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
                  variant="danger"
                  onClick={this.handleCheck}
                  id="deleteBtn"
                >
                  Delete Songs
                </Button>
              </Col>
            </Row>
          </AnimateDeleteMultipleSongs>
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Deleting Multiple Songs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              These songs will be deleted permanently. Are you sure?
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
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
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

export default connect(mapStateToProps, { deleteSong, getAllSongs })(
  withRouter(DeleteMultipleSongsComponent)
);
