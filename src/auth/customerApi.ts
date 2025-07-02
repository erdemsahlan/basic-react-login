import axiosInstance from './axiosInstance';

export interface CustomerDto {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  comment?: string;
  companyName: string;
  active?: boolean;
}

export const createCustomer = (customer: CustomerDto) => {
  return axiosInstance.post<CustomerDto>('/api/customers', customer);
};

export const getCustomerById = (id: number) => {
  return axiosInstance.get<CustomerDto>(`/api/customers/${id}`);
};

export const getAllCustomers = () => {
  return axiosInstance.get<CustomerDto[]>('/api/customers');
};

export const getCustomersByStatus = (active: boolean) => {
  return axiosInstance.get<CustomerDto[]>(`/api/customers/by-status?active=${active}`);
};

export const updateCustomer = (id: number, customer: CustomerDto) => {
  return axiosInstance.put<CustomerDto>(`/api/customers/${id}`, customer);
};

export const deleteCustomer = (id: number) => {
  return axiosInstance.delete<void>(`/api/customers/${id}`);
}; 