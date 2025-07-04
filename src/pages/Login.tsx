import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import axiosInstance from '../auth/axiosInstance';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });
      console.log(response.data);
      if (response.data.token) {
        login(response.data.token);
        showToast('success', 'Başarılı!', 'Giriş yapıldı');
        navigate('/');
      } else {
        showToast('error', 'Hata!', 'Token alınamadı');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        showToast('error', 'Giriş Hatası', error.response.data.message);
      } else {
        showToast('error', 'Hata!', 'Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <h2>GİRİŞ İŞLEMLERİ</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
};

export default Login;
