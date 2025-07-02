import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import './Customers.css';
import CustomerAddModal from '../components/CustomerAddModal';
import { getAllCustomers, createCustomer, CustomerDto } from '../auth/customerApi';
import { Tooltip } from 'primereact/tooltip';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const { showToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    surname: '',
    phone: '',
    company: '',
    description: ''
  });
  const navigate = useNavigate();
  const [detailLoadingId, setDetailLoadingId] = useState<number | null>(null);

  useEffect(() => {
    getAllCustomers()
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
        showToast('success', 'Başarılı!', 'Müşteri listesi yüklendi');
      })
      .catch(() => {
        setLoading(false);
        showToast('error', 'Hata!', 'Müşteri listesi yüklenemedi');
      });
  }, [showToast]);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };

    _filters['global'].value = value || null;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      company: { value: null, matchMode: FilterMatchMode.CONTAINS },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue('');
  };

  const statusBodyTemplate = (rowData: CustomerDto) => {
    return (
      <span className={`status-badge status-${rowData.active ? 'active' : 'inactive'}`}>
        {rowData.active ? 'Aktif' : 'Pasif'}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: CustomerDto) => {
    const detailBtnId = `detail-btn-${rowData.id}`;
    return (
      <div className="action-buttons">
        <Button
          id={detailBtnId}
          icon="pi pi-arrow-right"
          className="p-button-rounded p-button-info p-button-sm"
          onClick={async () => {
            setDetailLoadingId(rowData.id ?? null);
            setTimeout(() => {
              navigate(`/customers/${rowData.id}`);
              setDetailLoadingId(null);
            }, 500);
          }}
          data-pr-tooltip="Detaylara Git"
          loading={detailLoadingId === rowData.id}
        />
      </div>
    );
  };

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleModalSave = async () => {
    try {
      const payload: CustomerDto = {
        firstName: newCustomer.name,
        lastName: newCustomer.surname,
        phoneNumber: newCustomer.phone,
        companyName: newCustomer.company,
        comment: newCustomer.description,
        active: true
      };
      const res = await createCustomer(payload);
      setCustomers((prev) => [...prev, res.data]);
      showToast('success', 'Başarılı', 'Yeni müşteri eklendi');
      setShowAddModal(false);
      setNewCustomer({ name: '', surname: '', phone: '', company: '', description: '' });
    } catch (err) {
      showToast('error', 'Hata', 'Müşteri eklenemedi');
    }
  };

  const handleModalCancel = () => {
    setShowAddModal(false);
    setNewCustomer({ name: '', surname: '', phone: '', company: '', description: '' });
  };

  const renderHeader = () => {
    return (
      <div className="table-header">
        <div className="search-container">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Müşteri ara..."
              className="global-search-input"
            />
          </span>
          {globalFilterValue && (
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-text p-button-sm clear-filter-btn"
              onClick={clearFilter}
              tooltip="Filtreyi Temizle"
            />
          )}
        </div>
        <div className="header-actions">
          <Button
            label="Yeni Müşteri"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={handleAddNew}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>Müşteriler</h1>
        <div className="page-stats">
          <span className="stat-item">
            <i className="pi pi-users"></i>
            Toplam: {customers.length}
          </span>
          <span className="stat-item">
            <i className="pi pi-check-circle"></i>
            Aktif: {customers.filter(c => c.active).length}
          </span>
          <span className="stat-item">
            <i className="pi pi-times-circle"></i>
            Pasif: {customers.filter(c => !c.active).length}
          </span>
        </div>
      </div>

      <div className="card">
        <DataTable
          value={customers}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          globalFilterFields={['firstName', 'lastName', 'phoneNumber', 'companyName', 'comment']}
          emptyMessage="Müşteri bulunamadı"
          className="customers-table"
          header={renderHeader()}
        >
          <Column
            field="id"
            header="ID"
            sortable
            style={{ width: '80px' }}
          />
          <Column
            header="Ad Soyad"
            body={(rowData: CustomerDto) => `${rowData.firstName} ${rowData.lastName}`}
            sortable
            style={{ minWidth: '200px' }}
          />
          <Column
            field="phoneNumber"
            header="Telefon"
            sortable
            style={{ minWidth: '150px' }}
          />
          <Column
            field="companyName"
            header="Şirket"
            sortable
            style={{ minWidth: '200px' }}
          />
          <Column
            field="comment"
            header="Açıklama"
            sortable
            style={{ minWidth: '200px' }}
          />
          <Column
            field="active"
            header="Durum"
            body={statusBodyTemplate}
            sortable
            style={{ width: '120px' }}
          />
          <Column
            header="İşlemler"
            body={actionBodyTemplate}
            style={{ width: '150px' }}
            exportable={false}
          />
        </DataTable>
      </div>

      <CustomerAddModal
        visible={showAddModal}
        onHide={handleModalCancel}
        onSave={handleModalSave}
        customer={newCustomer}
        onChange={handleModalChange}
      />
    </div>
  );
};

export default Customers; 