import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './CustomerAddModal.css';

interface CustomerAddModalProps {
  visible: boolean;
  onHide: () => void;
  onSave: () => void;
  customer: {
    name: string;
    surname: string;
    phone: string;
    company: string;
    description: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomerAddModal: React.FC<CustomerAddModalProps> = ({ visible, onHide, onSave, customer, onChange }) => {
  return (
    <Dialog
      visible={visible}
      style={{ width: '440px' }}
      onHide={onHide}
      className="blurred-modal"
      maskClassName="modal-blur-bg"
      closable={false}
      header={null}
      footer={null}
    >
      <Card title="Yeni Müşteri Ekle" className="outer-card">
        <Card title="Müşteri Bilgileri">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="name">Adı</label>
              <InputText id="name" name="name" value={customer.name} onChange={onChange} autoFocus />
            </div>
            <div className="p-field">
              <label htmlFor="surname">Soyadı</label>
              <InputText id="surname" name="surname" value={customer.surname} onChange={onChange} />
            </div>
            <div className="p-field">
              <label htmlFor="phone">Telefon</label>
              <InputText id="phone" name="phone" value={customer.phone} onChange={onChange} />
            </div>
            <div className="p-field">
              <label htmlFor="company">Şirket Adı</label>
              <InputText id="company" name="company" value={customer.company} onChange={onChange} />
            </div>
            <div className="p-field">
              <label htmlFor="description">Açıklama</label>
              <InputText id="description" name="description" value={customer.description} onChange={onChange} />
            </div>
          </div>
        </Card>
        <div className="modal-footer-btns">
          <Button label="İptal" icon="pi pi-times" className="p-button-text" onClick={onHide} />
          <Button label="Kaydet" icon="pi pi-check" className="p-button-success" onClick={onSave} />
        </div>
      </Card>
    </Dialog>
  );
};

export default CustomerAddModal; 