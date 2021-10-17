import axios from "axios";

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_REQUEST,
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

// Async Action Creators
export const getAllUsers = () => {
  return (dispatch) => {
    dispatch(fetchAllUsersRequest());
    axios
      .get("https://songs-stream-data-server-app.herokuapp.com/users")
      .then((response) => {
        console.log("Get all users", response.data);
        dispatch(fetchAllUsersSuccess(response.data));
      })
      .catch((error) => dispatch(fetchAllUsersFailure(error)));
  };
};

export const registerUser = (values) => {
  return (dispatch) => {
    dispatch(registerUserRequest());
    axios
      .post("https://songs-stream-data-server-app.herokuapp.com/users", values)
      .then((response) => {
        console.log("axios in registerUser", response.data);
        dispatch(registerUserSuccess(response.data));
      })
      .catch((error) => dispatch(registerUserFailure(error)));
  };
};

export const updateUser = (id, user) => {
  return (dispatch) => {
    dispatch(updateUserRequest());
    axios
      .put(`https://songs-stream-data-server-app.herokuapp.com/users/${id}`, user)
      .then((response) => {
        console.log("Inside update user action", response.data);
        dispatch(updateUserSuccess(response.data));
      })
      .catch((error) => dispatch(updateUserFailure(error)));
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch(deleteUserRequest());
    axios
      .delete(`https://songs-stream-data-server-app.herokuapp.com/users/${id}`)
      .then(() => {
        dispatch(deleteUserSuccess());
      })
      .catch((error) => dispatch(deleteUserFailure(error)));
  };
};

// Sync Action Creators
export const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
  };
};

export const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };
};

export const fetchAllUsersRequest = () => {
  return {
    type: FETCH_ALL_USERS_REQUEST,
  };
};

export const fetchAllUsersSuccess = (users) => {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchAllUsersFailure = (error) => {
  return {
    type: FETCH_ALL_USERS_FAILURE,
    payload: error,
  };
};

export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};

export const clearAllUsers = () => {
  return {
    type: CLEAR_ALL_USERS,
  };
};

export const userLoginSuccess = (user) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  };
};

export const userLogoutSuccess = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

export const updateUserFailure = (error) => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error,
  };
};

export const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  };
};

export const deleteUserSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};

export const deleteUserFailure = (error) => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error,
  };
};
