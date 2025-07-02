import axios from 'axios';
import { showGlobalToast } from '../utils/toastUtils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          showGlobalToast('warn', 'Oturum Süresi Doldu', 'Lütfen tekrar giriş yapın');
          window.location.href = '/login';
          break;
        case 403:
          showGlobalToast('error', 'Yetkisiz Erişim', 'Bu işlem için yetkiniz bulunmuyor');
          window.location.href = '/login';
          break;
        case 500:
          showGlobalToast('error', 'Sunucu Hatası', 'Sunucu tarafında bir hata oluştu');
          break;
        case 404:
          showGlobalToast('warn', 'Sayfa Bulunamadı', 'İstenen kaynak bulunamadı');
          break;
        case 400:
          showGlobalToast('warn', 'Geçersiz İstek', 'Gönderilen veriler geçersiz');
          break;
        case 422:
          showGlobalToast('warn', 'Doğrulama Hatası', 'Gönderilen veriler doğrulanamadı');
          break;
        case 429:
          showGlobalToast('warn', 'Çok Fazla İstek', 'Çok fazla istek gönderildi, lütfen bekleyin');
          break;
        case 503:
          showGlobalToast('error', 'Servis Kullanılamıyor', 'Sunucu geçici olarak kullanılamıyor');
          break;
        default:
          if (error.response.status >= 500) {
            showGlobalToast('error', 'Sunucu Hatası', `Sunucu hatası: ${error.response.status}`);
          } else if (error.response.status >= 400) {
            showGlobalToast('warn', 'İstemci Hatası', `İstek hatası: ${error.response.status}`);
          } else {
            showGlobalToast('error', 'Hata', `Bilinmeyen hata: ${error.response.status}`);
          }
          break;
      }
    } else if (error.request) {
      showGlobalToast('error', 'Bağlantı Hatası', 'Sunucuya bağlanılamıyor');
    } else {
      showGlobalToast('error', 'Hata', 'Beklenmeyen bir hata oluştu');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
