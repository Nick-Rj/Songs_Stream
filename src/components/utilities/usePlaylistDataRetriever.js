import React, { useEffect, useState } from "react";
import axios from "axios";

const usePlaylistDataRetriever = (playlistID, songsData) => {
  const [playlist, setPlaylist] = useState({});
  const [songsResult, setSongsResult] = useState([]);
  const [error, setError] = useState(null);
  // const [emptyID, setEmptyID] = useState([]);
  // const [songsToRemove, setSongsToRemove] = useState([]);

  //   let handlePlaylistSuccessFetch = (playlistData) => setPlaylist(playlistData);
  //   let handleSongsFetch = (songsData) => setSongsResult(songsData);
  //   let handleError = (error) => setError(error);
  let emptyIDs = [];

  const fetchPlaylistByID = (id) =>
    axios
      .get(`https://songs-stream-data-server-app.herokuapp.com/playlists/${id}`)
      .then((response) => {
        setPlaylist(response.data);
        getSongsFromPlaylist(response.data);
      })
      .catch((error) => setError(error));

  const getSongsFromPlaylist = (playlist) => {
    console.log("Playlist data from GET API", playlist);
    const playlistIDs = playlist.songsIDs;
    console.log("SOng IDs from playlist", playlistIDs);
    const songsArr = songsData.songs.map((song) => song.id);
    console.log("All songs Positions", songsArr);
    let songPositions = [];
    emptyIDs = [];
    playlistIDs.forEach((id) => {
      if (songsArr.indexOf(id) === -1) {
        emptyIDs.push(id);
      } else {
        songPositions.push(songsArr.indexOf(id));
      }
    });
    console.log("All empty IDs", emptyIDs);
    if (emptyIDs.length !== 0) {
      // setSongsToRemove(emptyIDs);
      console.log("There are empty songs", emptyIDs);
    }
    console.log("Position of songs in the playlist", songPositions);
    setSongsResult([]);
    songPositions.forEach((id) => {
      if (id === -1) {
      } else {
        setSongsResult((oldArr) => [...oldArr, songsData.songs[id]]);
      }
    });
    console.log("All the songs Data inside Playlist", songsResult.length);
  };

  useEffect(() => {
    if (playlistID !== playlist.id) fetchPlaylistByID(playlistID);
  }, [playlistID, playlist.id]);

  return [playlist, songsResult, error];
};

export default usePlaylistDataRetriever;
