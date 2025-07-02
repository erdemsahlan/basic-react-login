import React from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Müşteri Detayı</h1>
      <p>Müşteri ID: {id}</p>
      {/* Burada müşteri bilgileri ve işlemleri gösterilecek */}
    </div>
  );
};

export default CustomerDetail; 