import axios from 'axios';

const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// multipart/form-data 자동 설정
defaultInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultInstance.interceptors.response.use(
  (response) => {
    return response; // 정상적인 응답
  },
  (error) => {
    if (error.response) {
      // 서버에서 반환된 응답이 있는 경우
      console.error('API 요청 실패: ', {
        status: error.response.status,
        message: error.response.data?.message || '알 수 없는 에러 발생',
      });

      return Promise.reject(
        new Error(error.response.data?.message || 'API 요청에 실패했습니다.')
      );
    }
    // 서버에 도달하지 못한 경우
    else if (error.request) {
      console.error('서버 응답 없음: 네트워크 오류');
      return Promise.reject(new Error('서버에 연결할 수 없습니다.'));
    }
    // 기타 에러 ( 요청 설정 문제 등 )
    else {
      console.error('요청 구성 오류: ', error.message);
      return Promise.reject(new Error('요청 중 문제가 발생했습니다.'));
    }
  }
);

export default defaultInstance;
