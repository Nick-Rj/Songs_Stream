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
  UPDATE_PLAYLIST_FAILURE,
} from "./playlistTypes";

const initialState = {
  loading: false,
  playlists: [],
  error: "",
};

let playlists = [];
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PLAYLISTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_PLAYLISTS_SUCCESS:
      return {
        loading: false,
        playlists: action.payload,
        error: "",
      };

    case FETCH_ALL_PLAYLISTS_FAILURE:
      return {
        loading: false,
      };

    case ADD_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_PLAYLIST_SUCCESS:
      playlists = state.playlists.concat(action.payload);
      return {
        loading: false,
        playlists: playlists,
        error: "",
      };

    case ADD_PLAYLIST_FAILURE:
      return {
        loading: false,
        playlists: [],
        error: action.payload,
      };

    case DELETE_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PLAYLIST_SUCCESS:
      const ids = state.playlists.map((playlist) => playlist.id);
      playlists = state.playlists.slice(0, ids.indexOf(action.payload));
      playlists = playlists.concat([
        ...state.playlists.slice(ids.indexOf(action.payload) + 1),
      ]);
      return {
        loading: false,
        playlists: playlists,
        error: "",
      };

    case DELETE_PLAYLIST_FAILURE:
      return {
        loading: false,
        playlists: [],
        error: action.payload,
      };

    case UPDATE_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default playlistReducer;
