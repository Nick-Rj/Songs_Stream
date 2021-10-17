import { combineReducers } from "redux";
import songReducer from "../songs/songReducer";
import userReducer from "../users/userReducer";
import playlistReducer from "../playlists/playlistReducer";

const rootReducer = combineReducers({
  user: userReducer,
  song: songReducer,
  playlist: playlistReducer,
});

export default rootReducer;
