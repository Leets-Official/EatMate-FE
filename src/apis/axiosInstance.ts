import axios from 'axios';

const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

defaultInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('Error: 401 -인증 실패');
    }
    return Promise.reject(error);
  }
);

export default defaultInstance;
