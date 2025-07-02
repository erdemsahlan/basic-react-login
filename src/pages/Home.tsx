import React from 'react';
import { useToast } from '../context/ToastContext';
import axiosInstance from '../auth/axiosInstance';

const Home: React.FC = () => {
  const { showToast } = useToast();

  const handleApiCall = async () => {
    try {
      const response = await axiosInstance.get('/protected-endpoint');
      showToast('success', 'Başarılı!', 'API çağrısı başarılı: ' + JSON.stringify(response.data));
    } catch (error: any) {
      if (error.response?.data?.message) {
        showToast('error', 'API Hatası', error.response.data.message);
      } else {
        showToast('error', 'Hata!', 'API çağrısı sırasında bir hata oluştu');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Hoşgeldiniz! (Giriş başarılı)</h1>
      <p>Sol menüden farklı sayfalara erişebilirsiniz.</p>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={handleApiCall}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Korumalı API'ye İstek At
        </button>
      </div>
    </div>
  );
};

export default Home;
