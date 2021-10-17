import axios from "axios";
import {
  FETCH_ALL_PLAYLISTS_REQUEST,
  FETCH_ALL_PLAYLISTS_SUCCESS,
  FETCH_ALL_PLAYLISTS_FAILURE,
  ADD_PLAYLIST_REQUEST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_FAILURE,
  DELETE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAILURE,
  UPDATE_PLAYLIST_REQUEST,
  UPDATE_PLAYLIST_SUCCESS,
  UPDATE_PLAYLIST_FAILURE,
} from "./playlistTypes";

// Async Action Creators
export const getAllPlaylists = () => {
  return (dispatch) => {
    dispatch(fetchAllPlaylistsRequest());
    axios
      .get("https://songs-stream-data-server-app.herokuapp.com/playlists")
      .then((response) => {
        console.log("Get all Playlists", response.data);
        dispatch(fetchAllPlaylistsSuccess(response.data));
      })
      .catch((error) => dispatch(fetchAllPlaylistsFailure(error)));
  };
};

export const addPlaylist = (values) => {
  return (dispatch) => {
    dispatch(addPlaylistRequest());
    axios
      .post("https://songs-stream-data-server-app.herokuapp.com/playlists", values)
      .then((response) => {
        console.log("Action Creator: Playlist added", response.data);
        dispatch(addPlaylistSuccess(response.data));
      })
      .catch((error) => dispatch(addPlaylistFailure(error)));
  };
};

export const deletePlaylist = (id) => {
  return (dispatch) => {
    dispatch(deletePlaylistRequest());
    axios
      .delete(`https://songs-stream-data-server-app.herokuapp.com/playlists/${id}`)
      .then(() => {
        dispatch(deletePlaylistSuccess(id));
      })
      .catch((error) => dispatch(deletePlaylistFailure(error)));
  };
};

export const updatePlaylist = (id, playlist) => {
  return (dispatch) => {
    dispatch(updatePlaylistRequest());
    axios
      .put(`https://songs-stream-data-server-app.herokuapp.com/playlists/${id}`, playlist)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => dispatch(updatePlaylistFailure(error)));
  };
};

// Sync Action Creators
export const fetchAllPlaylistsRequest = () => {
  return {
    type: FETCH_ALL_PLAYLISTS_REQUEST,
  };
};

export const fetchAllPlaylistsSuccess = (playlists) => {
  return {
    type: FETCH_ALL_PLAYLISTS_SUCCESS,
    payload: playlists,
  };
};

export const fetchAllPlaylistsFailure = (error) => {
  return {
    type: FETCH_ALL_PLAYLISTS_FAILURE,
    payload: error,
  };
};

// export const fetchPlaylistByIdRequest = () => {
//   return {
//     type: FETCH_PLAYLIST_BY_ID_REQUEST,
//   };
// };

// export const fetchPlaylistByIdSuccess=(playlist)=>{

// }

export const addPlaylistRequest = () => {
  return {
    type: ADD_PLAYLIST_REQUEST,
  };
};

export const addPlaylistSuccess = (playlist) => {
  return {
    type: ADD_PLAYLIST_SUCCESS,
    payload: playlist,
  };
};

export const addPlaylistFailure = (error) => {
  return {
    type: ADD_PLAYLIST_FAILURE,
    payload: error,
  };
};

export const deletePlaylistRequest = () => {
  return {
    type: DELETE_PLAYLIST_REQUEST,
  };
};

export const deletePlaylistSuccess = (id) => {
  return {
    type: DELETE_PLAYLIST_SUCCESS,
    payload: id,
  };
};

export const deletePlaylistFailure = (error) => {
  return {
    type: DELETE_PLAYLIST_FAILURE,
    payload: error,
  };
};

export const updatePlaylistRequest = () => {
  return {
    type: UPDATE_PLAYLIST_REQUEST,
  };
};

export const updatePlaylistFailure = (error) => {
  return {
    type: UPDATE_PLAYLIST_FAILURE,
    payload: error,
  };
};
