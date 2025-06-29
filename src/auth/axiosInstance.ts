import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Hata koduna göre dinamik işlem
      switch (error.response.status) {
        case 401:
          // Token geçersiz veya süresi dolmuş, login'e yönlendir
          window.location.href = '/login';
          break;
        case 403:
          alert('Yetkisiz erişim!');
          break;
        case 500:
          alert('Sunucu hatası!');
          break;
        default:
          alert(`Hata: ${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
