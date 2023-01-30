import authService from "services/auth.service";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN } from "./types";

export const refreshToken = (token) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: token,
  });
};

export const login = (payload) => (dispatch) => {
  return authService.login(payload).then(
    (data) => {
      if (data?.token) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: LOGOUT,
  });
};
