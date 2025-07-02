import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useToast } from '../context/ToastContext';
import './Customers.css';
import { getAllProducts, createProduct, ProductDto } from '../auth/productApi';
import ProductAddModal from '../components/ProductAddModal';

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    productKilograms: 0,
    active: true
  });
  const { showToast } = useToast();

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        showToast('success', 'Başarılı!', 'Ürün listesi yüklendi');
      })
      .catch(() => {
        setLoading(false);
        showToast('error', 'Hata!', 'Ürün listesi yüklenemedi');
      });
  }, [showToast]);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilterValue(e.target.value);
  };

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === 'productKilograms' ? Number(value) : value
    }));
  };

  const handleModalSave = async () => {
    try {
      const payload: ProductDto = {
        productName: newProduct.productName,
        productDescription: newProduct.productDescription,
        productKilograms: Number(newProduct.productKilograms),
        active: true
      };
      const res = await createProduct(payload);
      setProducts((prev) => [...prev, res.data]);
      showToast('success', 'Başarılı', 'Yeni ürün eklendi');
      setShowAddModal(false);
      setNewProduct({ productName: '', productDescription: '', productKilograms: 0, active: true });
    } catch (err) {
      showToast('error', 'Hata', 'Ürün eklenemedi');
    }
  };

  const handleModalCancel = () => {
    setShowAddModal(false);
    setNewProduct({ productName: '', productDescription: '', productKilograms: 0, active: true });
  };

  const renderHeader = () => (
    <div className="table-header">
      <div className="search-container">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Ürün ara..."
            className="global-search-input"
          />
        </span>
      </div>
      <div className="header-actions">
        <Button
          label="Yeni Ürün"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={handleAddNew}
        />
      </div>
    </div>
  );

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Ürünler</h1>
        <div className="page-stats">
          <span className="stat-item">
            <i className="pi pi-box"></i>
            Toplam: {products.length}
          </span>
          <span className="stat-item">
            <i className="pi pi-check-circle"></i>
            Aktif: {products.filter(p => p.active).length}
          </span>
          <span className="stat-item">
            <i className="pi pi-times-circle"></i>
            Pasif: {products.filter(p => !p.active).length}
          </span>
        </div>
      </div>
      <div className="card">
        <DataTable
          value={products}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          loading={loading}
          globalFilterFields={['productName', 'productDescription']}
          emptyMessage="Ürün bulunamadı"
          className="products-table"
          header={renderHeader()}
        >
          <Column field="id" header="ID" sortable style={{ width: '80px' }} />
          <Column field="productName" header="Ürün Adı" sortable style={{ minWidth: '200px' }} />
          <Column field="productDescription" header="Açıklama" sortable style={{ minWidth: '200px' }} />
          <Column field="productKilograms" header="Kilogram" sortable style={{ minWidth: '100px' }} />
          <Column field="active" header="Durum" body={(rowData: ProductDto) => (
            <span className={`status-badge status-${rowData.active ? 'active' : 'inactive'}`}>{rowData.active ? 'Aktif' : 'Pasif'}</span>
          )} sortable style={{ width: '120px' }} />
        </DataTable>
      </div>
      <ProductAddModal
        visible={showAddModal}
        onHide={handleModalCancel}
        onSave={handleModalSave}
        product={newProduct}
        onChange={handleModalChange}
      />
    </div>
  );
};

export default Products; 