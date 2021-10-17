import axios from "axios";
import {
  ADD_SONG_FAILURE,
  ADD_SONG_REQUEST,
  ADD_SONG_SUCCESS,
  DELETE_SONG_FAILURE,
  DELETE_SONG_REQUEST,
  DELETE_SONG_SUCCESS,
  FETCH_ALL_SONGS_FAILURE,
  FETCH_ALL_SONGS_REQUEST,
  FETCH_ALL_SONGS_SUCCESS,
  UPDATE_SONG_FAILURE,
  UPDATE_SONG_REQUEST,
  UPDATE_SONG_SUCCESS,
} from "./songTypes";

// Async Action Creators
export const getAllSongs = () => {
  return (dispatch) => {
    dispatch(fetchAllSongsRequest());
    axios
      .get("https://songs-stream-data-server-app.herokuapp.com/songs")
      .then((response) => {
        console.log("Get all Songs", response.data);
        dispatch(fetchAllSongsSuccess(response.data));
      })
      .catch((error) => dispatch(fetchAllSongsFailure(error)));
  };
};

export const addSong = (values) => {
  return (dispatch) => {
    dispatch(addSongRequest());
    axios
      .post("https://songs-stream-data-server-app.herokuapp.com/songs", values)
      .then((response) => {
        console.log("axios in addSong", response.data);
        dispatch(addSongSuccess(response.data));
      })
      .catch((error) => dispatch(addSongFailure(error)));
  };
};

export const updateSong = (id, song) => {
  return (dispatch) => {
    dispatch(updateSongRequest());
    axios
      .put(`https://songs-stream-data-server-app.herokuapp.com/songs/${id}`, song)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => dispatch(updateSongFailure(error)));
  };
};

export const deleteSong = (id) => {
  return (dispatch) => {
    dispatch(deleteSongRequest());
    axios
      .delete(`https://songs-stream-data-server-app.herokuapp.com/songs${id}`)
      .then(() => {
        dispatch(deleteSongSuccess(id));
      })
      .catch((error) => dispatch(deleteSongFailure(error)));
  };
};

// Sync Action Creators
export const fetchAllSongsRequest = () => {
  return {
    type: FETCH_ALL_SONGS_REQUEST,
  };
};

export const fetchAllSongsSuccess = (songs) => {
  return {
    type: FETCH_ALL_SONGS_SUCCESS,
    payload: songs,
  };
};

export const fetchAllSongsFailure = (error) => {
  return {
    type: FETCH_ALL_SONGS_FAILURE,
    payload: error,
  };
};

export const addSongRequest = () => {
  return {
    type: ADD_SONG_REQUEST,
  };
};

export const addSongSuccess = (song) => {
  return {
    type: ADD_SONG_SUCCESS,
    payload: song,
  };
};

export const addSongFailure = (error) => {
  return {
    type: ADD_SONG_FAILURE,
    payload: error,
  };
};

export const updateSongRequest = () => {
  return {
    type: UPDATE_SONG_REQUEST,
  };
};

export const updateSongSuccess = (song) => {
  return {
    type: UPDATE_SONG_SUCCESS,
    payload: song,
  };
};

export const updateSongFailure = (error) => {
  return {
    type: UPDATE_SONG_FAILURE,
    payload: error,
  };
};

export const deleteSongRequest = () => {
  return {
    type: DELETE_SONG_REQUEST,
  };
};

export const deleteSongSuccess = (id) => {
  return {
    type: DELETE_SONG_SUCCESS,
    payload: id,
  };
};

export const deleteSongFailure = (error) => {
  return {
    type: DELETE_SONG_FAILURE,
    payload: error,
  };
};
