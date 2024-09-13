import axios from "axios";

const axiosRequest = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
});

export { axiosRequest };
