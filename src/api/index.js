import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const apiAuth = axios.create({
  baseURL: "http://localhost:3000",
});

export { api, apiAuth };
