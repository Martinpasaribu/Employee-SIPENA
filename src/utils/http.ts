// utils/http.ts
import axios from "axios";
import { BaseURL } from "./BaseURL";

const http = axios.create({
  baseURL: BaseURL, // sesuaikan endpoint backend kamu
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;

