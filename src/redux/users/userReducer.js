import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  CLEAR_CURRENT_USER,
  USER_LOGIN_SUCCESS,
  CLEAR_ALL_USERS,
  USER_LOGOUT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  user: {},
  error: "",
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        users: [],
        user: {},
        error: "",
        isLoggedIn: false,
      };

    case REGISTER_USER_SUCCESS:
      const users = state.users.concat(action.payload);
      return {
        loading: false,
        users: users,
        user: action.payload,
        error: "",
        isLoggedIn: false,
      };

    case REGISTER_USER_FAILURE:
      return {
        loading: false,
        users: [],
        user: {},
        error: action.payload,
        isLoggedIn: false,
      };

    case FETCH_ALL_USERS_REQUEST:
      return {
        loading: true,
        users: [],
        user: {},
        error: "",
        isLoggedIn: false,
      };

    case FETCH_ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        user: {},
        error: "",
        isLoggedIn: false,
      };

    case FETCH_ALL_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        user: {},
        error: action.payload,
        isLoggedIn: false,
      };

    case CLEAR_CURRENT_USER:
      return {
        loading: false,
        users: [],
        user: {},
        error: "",
        isLoggedIn: false,
      };

    case CLEAR_ALL_USERS:
      return {
        ...state,
        users: [],
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        users: [],
        user: action.payload,
        error: "",
        isLoggedIn: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        users: [],
        user: {},
        error: "",
        isLoggedIn: false,
      };

    case UPDATE_USER_REQUEST:
      return {
        loading: true,
        users: [],
        user: {},
        error: "",
        isLoggedIn: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        users: [],
        user: action.payload,
        error: "",
        isLoggedIn: true,
      };
    case UPDATE_USER_FAILURE:
      return {
        loading: false,
        users: [],
        user: {},
        error: action.payload,
        isLoggedIn: true,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        users: [],
        user: {},
        error: "",
        isLoggedIn: false,
      };

    case DELETE_USER_FAILURE:
      return {
        loading: false,
        users: [],
        user: {},
        error: action.payload,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default userReducer;
