import { toast } from "react-toastify";
import axiosInstance from "./api";
import tokenService from "./token.service";

const login = (payload) => {
  return axiosInstance
    .post("/login", payload)
    .then((response) => {
      if (response.data.token) {
        tokenService.setUser(response.data);
      }
      return response.data;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error || err?.code);
    });
};

const logout = () => {
  //note: need call api to invalidate token
  tokenService.removeUser();
};

export default { login, logout };
