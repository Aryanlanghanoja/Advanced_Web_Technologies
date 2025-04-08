import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    await axios
      .post("/login", { ...user })
      .then((response) => {
        if (response.status === 200) {
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user },
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: authConstants.LOGIN_PASS_ERROR,
          payload: { message: error.response.data.message },
        });
      });
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Please login" },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post("/logout");

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const userRegister = (form) => {
  return async (dispatch) => {
    const res = await axios
      .post("/register", form)
      .then((response) => {
        console.log("Done");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(res);
  };
};
