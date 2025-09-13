// lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Ganti sesuai base URL backend kamu
  withCredentials: true, // Agar cookie HttpOnly ikut dikirim
});

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      console.log("Session expired or unauthorized");
    }
    return Promise.reject(err);
  }
);

export default api;
