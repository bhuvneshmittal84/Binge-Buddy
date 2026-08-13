// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://proxy-backend-2-nbwe.onrender.com",
});

export default instance;
