import React from 'react';
import axiosInstance from '../auth/axiosInstance';

const Home: React.FC = () => {
  const handleApiCall = async () => {
    try {
      const response = await axiosInstance.get('/protected-endpoint');
      alert('API Başarılı: ' + JSON.stringify(response.data));
    } catch (error) {
      // Hata interceptor tarafından yönetilecek
    }
  };

  return (
    <div>
      Hoşgeldiniz! (Giriş başarılı)
      <br />
      <button onClick={handleApiCall}>Korumalı API'ye İstek At</button>
    </div>
  );
};

export default Home;
