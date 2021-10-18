import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Registration from "./components/authentication/Registration";
import UserConfirmation from "./components/authentication/UserConfirmation";
import Login from "./components/authentication/Login";
import SongsLibrary from "./components/songsLibrary/SongsLibrary";
import ProfileView from "./components/authentication/ProfileView";
import EditUserData from "./components/authentication/EditUserData";
import ChangePassword from "./components/authentication/ChangePassword";
import AddSongComponent from "./components/songsLibrary/AddSongComponent";
import UpdateSongComponent from "./components/songsLibrary/UpdateSongComponent";
import DeleteMultipleSongsComponent from "./components/songsLibrary/DeleteMultipleSongsComponent";
import ManagePlaylists from "./components/playlist/ManagePlaylists";
import PlaylistViewComponent from "./components/playlist/PlaylistViewComponent";
import AddSongsToPlaylist from "./components/playlist/AddSongsToPlaylist";
import About from "./components/dashboard/About";
import DeleteSongsFromPlaylist from "./components/playlist/DeleteSongsFromPlaylist";
import TopPlaylistsChart from "./components/utilities/TopPlaylistsChart";

import PromptModal from "./components/utilities/PromptModal";

import Logo from "./assets/images/Logo.png";

setTimeout(() => {
  document.getElementById("splashScreen").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
}, 8500);

function App() {
  return (
    <div>
      <div id="splashScreen">
        <Container>
          <Row>
            <Col>
              <p id="GC-1">SONGS.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p id="GC-2">CHILL.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p id="GC-3">PARTY.</p>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={12} sm={12} lg={4}>
              <div id="logoCenter">
                <img src={Logo} alt="" id="GC-4" />
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
      <div className="App" id="mainApp">
        <Router
          getUserConfirmation={(message, callback) =>
            PromptModal(message, callback)
          }
        >
          <Dashboard />

          <div className="pages">
            <Switch>
              <Route exact path="/register" component={Registration}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route
                exact
                path="/songsLibrary"
                component={SongsLibrary}
              ></Route>
              <Route
                exact
                path="/userConfirm"
                component={UserConfirmation}
              ></Route>
              <Route exact path="/profileView" component={ProfileView}></Route>
              <Route exact path="/editUser" component={EditUserData}></Route>
              <Route
                exact
                path="/changePassword"
                component={ChangePassword}
              ></Route>
              <Route exact path="/addSong" component={AddSongComponent}></Route>
              <Route
                exact
                path="/updateSong"
                component={UpdateSongComponent}
              ></Route>
              <Route
                exact
                path="/deleteMultipleSongs"
                component={DeleteMultipleSongsComponent}
              ></Route>
              {
                <Route
                  exact
                  path="/managePlaylists"
                  component={ManagePlaylists}
                ></Route>
              }

              <Route
                exact
                path="/playlists/:id"
                component={PlaylistViewComponent}
              ></Route>
              <Route
                exact
                path="/playlists/:id/addSongs"
                component={AddSongsToPlaylist}
              ></Route>
              <Route
                exact
                path="/playlists/:id/deleteSongs"
                component={DeleteSongsFromPlaylist}
              ></Route>
              <Route exact path="/about" component={About}></Route>
              <Route
                exact
                path="/topPlaylists"
                component={TopPlaylistsChart}
              ></Route>
              <Route
                render={() => (
                  <div>
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
                    <h1
                      style={{
                        color: "rgb(56, 219, 105)",
                        marginTop: "10rem",
                        background:
                          "url(./assets/images/NotFound.jpg) center fixed no-repeat",
                      }}
                    >
                      Page not found!
                    </h1>
                  </div>
                )}
              ></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
