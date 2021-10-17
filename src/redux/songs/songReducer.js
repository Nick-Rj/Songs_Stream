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
} from "./songTypes";

const initialState = {
  loading: false,
  songs: [],
  error: "",
};

let songs = [];
const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SONGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_SONGS_SUCCESS:
      return {
        loading: false,
        songs: action.payload,
        error: "",
      };

    case FETCH_ALL_SONGS_FAILURE:
      return {
        loading: false,
        songs: [],
        error: action.payload,
      };

    case ADD_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_SONG_SUCCESS:
      songs = state.songs.concat(action.payload);
      return {
        loading: false,
        songs: songs,
        error: "",
      };

    case ADD_SONG_FAILURE:
      return {
        loading: false,
        songs: [],
        error: action.payload,
      };

    case UPDATE_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SONG_SUCCESS:
      const ids = state.songs.map((song) => song.id);
      // console.log("All the song ids", ids);
      // console.log("Index of", ids.indexOf(21));
      songs = state.songs.slice(0, ids.indexOf(action.payload));
      songs = songs.concat([
        ...state.songs.slice(ids.indexOf(action.payload) + 1),
      ]);
      // console.log("Songs after deleting", songs);
      // console.log("IDs", ids);
      return {
        loading: false,
        songs: songs,
        error: "",
      };

    case DELETE_SONG_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default songReducer;
