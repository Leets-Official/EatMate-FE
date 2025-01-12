import axios from 'axios';

const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 3000,
});

export default defaultInstance;
