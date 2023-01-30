import axios from "axios";
import { configure } from "axios-hooks";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

configure({ axios: instance });

export default instance;
