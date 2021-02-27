import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-42927/us-central1/api",
});

export default instance;
