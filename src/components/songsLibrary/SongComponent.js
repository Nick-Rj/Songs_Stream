import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import { deleteSong } from "../../redux/store";
import { connect } from "react-redux";

import "../../assets/styles/SongComponent.css";
const SongComponent = withRouter(
  ({ deleteSong, userLoggedInStatus, song, isSongsLibrary }) => {
    const toUpdateSong = useHistory();
    const handleUpdate = (data) => {
      toUpdateSong.push({
        pathname: "/updateSong",
        state: data,
      });
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteSong = () => {
      alert(`${song.title} delete successfully!`);
      deleteSong(song.id);

      handleClose();
    };

    const urlValidator = (event) => {
      if (song.url === "") {
        alert("Song not found! Please provide a proper url...");
        event.preventDefault();
      }
    };

    return (
      <div className="SongComponent">
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{song.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {song.singer}
            </Card.Subtitle>
            <br />
            <Card.Text className="text">
              <span>
                <h6>Album/Movie:</h6>
              </span>
              <span>{song.album_movie}</span>
            </Card.Text>
            <Card.Text className="text">
              <span>
                <h6>Genre:</h6>
              </span>
              <span>{song.genre}</span>
            </Card.Text>
            <Card.Text className="text">
              <span>
                <h6>Song Length:</h6>
              </span>
              <span>{song.length}</span>
            </Card.Text>
            <Card.Link href={song.url} target="_blank">
              <Button
                variant="primary"
                className="Button"
                onClick={urlValidator}
              >
                Listen on Youtube
              </Button>
            </Card.Link>
            {userLoggedInStatus && isSongsLibrary && (
              <div className="inline-component">
                <Button
                  variant="success"
                  className="Button"
                  onClick={() => handleUpdate(song)}
                >
                  Update
                </Button>
              </div>
            )}

            {userLoggedInStatus && isSongsLibrary && (
              <div className="inline-component">
                <Button variant="danger" onClick={handleShow}>
                  Delete
                </Button>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Song</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {song.title} will be deleted permanently. Are you sure?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteSong}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
);

export default connect(null, { deleteSong })(SongComponent);
