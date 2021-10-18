import React, { useEffect, useState } from "react";
import axios from "axios";

const usePlaylistDataRetriever = (playlistID, songsData) => {
  const [playlist, setPlaylist] = useState({});
  const [songsResult, setSongsResult] = useState([]);
  const [error, setError] = useState(null);

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
    const playlistIDs = playlist.songsIDs;

    const songsArr = songsData.songs.map((song) => song.id);

    let songPositions = [];
    emptyIDs = [];
    playlistIDs.forEach((id) => {
      if (songsArr.indexOf(id) === -1) {
        emptyIDs.push(id);
      } else {
        songPositions.push(songsArr.indexOf(id));
      }
    });

    setSongsResult([]);
    songPositions.forEach((id) => {
      if (id === -1) {
      } else {
        setSongsResult((oldArr) => [...oldArr, songsData.songs[id]]);
      }
    });
  };

  useEffect(() => {
    if (playlistID !== playlist.id) fetchPlaylistByID(playlistID);
  }, [playlistID, playlist.id]);

  return [playlist, songsResult, error];
};

export default usePlaylistDataRetriever;
