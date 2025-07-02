import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './CustomerAddModal.css';

interface ProductAddModalProps {
  visible: boolean;
  onHide: () => void;
  onSave: () => void;
  product: {
    productName: string;
    productDescription: string;
    productKilograms: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProductAddModal: React.FC<ProductAddModalProps> = ({ visible, onHide, onSave, product, onChange }) => {
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
      <Card title="Yeni Ürün Ekle" className="outer-card">
        <Card title="Ürün Bilgileri">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="productName">Ürün Adı</label>
              <InputText id="productName" name="productName" value={product.productName} onChange={onChange} autoFocus />
            </div>
            <div className="p-field">
              <label htmlFor="productKilograms">Kilogram</label>
              <InputText id="productKilograms" name="productKilograms" value={String(product.productKilograms)} onChange={onChange} keyfilter="int" />
            </div>
            <div className="p-field">
              <label htmlFor="productDescription">Açıklama</label>
              <InputText id="productDescription" name="productDescription" value={product.productDescription} onChange={onChange} />
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

export default ProductAddModal; 