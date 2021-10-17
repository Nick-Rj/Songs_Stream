import React, { useEffect, useState } from "react";
import "../../assets/styles/Dashboard.css";
import "../../assets/styles/ScrollbarStyles.css";
import styled from "styled-components";
import {
  NavLink,
  Link,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getAllPlaylists,
  getAllSongs,
  updatePlaylist,
} from "../../redux/store";

const COLORS = {
  primaryDark: "#115b4c",
  primaryLight: "#B6EDC8",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 2rem;
  right: 3rem;
  border-radius: 50%;
  height: 4.5rem;
  width: 4.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;

  @media (max-width: 768px) {
    top: 2rem;
    right: 2rem;
    height: 2.5rem;
    width: 2.5rem;
  }
`;

const NavBackground = styled.div`
  position: fixed;
  top: 2rem;
  right: 3rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s ease-in-out;

  @media (max-width: 768px) {
    top: 2rem;
    right: 2rem;
    height: 2.5rem;
    width: 2.5rem;
  }
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 2.5rem;
  height: 3px;
  display: inline-block;
  margin-top: 2.2rem;
  transition: all 0.3s;

  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 2.5rem;
    height: 3px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }

  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.6rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.6rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }

  @media (max-width: 768px) {
    height: 2px;
    width: 1.2rem;
    margin-top: 1.2rem;

    &::before,
    &::after {
      height: 2px;
      width: 1.2rem;
    }

    &::before {
      top: ${(props) => (props.clicked ? "0" : "-0.4rem")};
    }

    &::after {
      top: ${(props) => (props.clicked ? "0" : "0.4rem")};
    }
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};

  transition: width 0.5s, opacity 0.25s ease-out;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;

const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 2rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1rem 2rem;

  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 100%
  );
  background-size: 240%;
  transition: all 0.4s;

  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

const Dashboard = withRouter(
  ({
    history,
    userState,
    playlistData,
    songData,
    getAllPlaylists,
    getAllSongs,
    updatePlaylist,
  }) => {
    let destination = useHistory();
    useEffect(() => {
      console.log("History", history);
      // console.log("Match", match);
      console.log("location", history.location.pathname);
      // if (history.location.pathname === "/") {
      //   <Redirect to="/songsLibrary" />;
      // }
      if (history.location.pathname === "/") {
        destination.push("/songsLibrary");
      }
      console.log("User Data in Dashboard", userState);
      getAllPlaylists();
      getAllSongs();
      console.log("Playlist Data inside Dashboard", playlistData.playlists);
    }, []);
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const RouteHandler = useHistory();
    const handleFetchData = (id) => {
      updateAccessCount(id);
      RouteHandler.push({
        pathname: `/playlists/${id}`,
        state: songData,
      });
    };

    const updateAccessCount = (playlistID) => {
      console.log(
        "Playlist Data inside Dashboard from function",
        playlistData.playlists
      );
      const playlistIDs = playlistData.playlists.map((playlist) => playlist.id);
      const currentIndex = playlistIDs.indexOf(playlistID);
      const currentPlaylist =
        currentIndex === -1
          ? null
          : playlistData.playlists[playlistIDs.indexOf(playlistID)];
      console.log("Going to playlist", playlistID);
      console.log("Current playlist in dashboard", currentPlaylist);
      let playlistObj = null;

      if (currentPlaylist !== null) {
        playlistObj = {
          title: currentPlaylist.title,
          songsIDs: currentPlaylist.songsIDs,
          accessCount: currentPlaylist.accessCount + 1,
        };
      }
      console.log("Result playlist", playlistObj);
      updatePlaylist(playlistID, playlistObj);
    };

    return (
      <div className="Dashboard">
        <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
          <Icon clicked={click}>&nbsp;</Icon>
        </MenuLabel>
        <NavBackground clicked={click}>&nbsp;</NavBackground>

        <Navigation clicked={click}>
          <List>
            <li>
              <ItemLink onClick={handleClick} to="/about">
                About
              </ItemLink>
            </li>
            <li>
              <ItemLink onClick={handleClick} to="/songsLibrary">
                Songs Library
              </ItemLink>
            </li>
            <li>
              <ItemLink onClick={handleClick} to="/managePlaylists">
                Manage Playlist
              </ItemLink>
            </li>
            <li>
              <Container>
                <Row>
                  <Col></Col>
                  <Col xs={12} sm={12} lg={4}>
                    <h4>Playlists</h4>
                    <div className="scrollbar scrollbar-dusty-grass">
                      <div className="force-overflow">
                        <ul id="playlistList">
                          {playlistData.playlists === undefined ? (
                            <p>No playlists</p>
                          ) : (
                            playlistData.playlists.map((playlist) => (
                              <li key={playlist.id} id="playlistItem">
                                <button
                                  onClick={() => {
                                    handleFetchData(playlist.id);
                                    handleClick();
                                  }}
                                >
                                  {playlist.title}
                                </button>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
            </li>
          </List>
        </Navigation>
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    userState: state.user,
    songData: state.song,
    playlistData: state.playlist,
  };
};

export default connect(mapStateToProps, {
  getAllPlaylists,
  getAllSongs,
  updatePlaylist,
})(Dashboard);
