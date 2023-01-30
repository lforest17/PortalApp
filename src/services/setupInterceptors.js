import { refreshToken } from "../actions/auth";
import axiosInstance from "./api";
import tokenService from "./token.service";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/login" && err.response) {
        // token expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/refreshtoken", {
              refreshToken: tokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            dispatch(refreshToken(accessToken));
            tokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
