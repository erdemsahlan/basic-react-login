import axiosInstance from './axiosInstance';

export interface ProductDto {
  id?: number;
  productName: string;
  productDescription: string;
  productKilograms: number;
  active: boolean;
  createdDate?: string;
  updateDate?: string;
}

export const getAllProducts = () => axiosInstance.get<ProductDto[]>('/api/products');
export const getProductById = (id: number) => axiosInstance.get<ProductDto>(`/api/products/${id}`);
export const getProductsByStatus = (active: boolean) => axiosInstance.get<ProductDto[]>(`/api/products/by-status?active=${active}`);
export const createProduct = (product: ProductDto) => axiosInstance.post<ProductDto>('/api/products', product);
export const updateProduct = (id: number, product: ProductDto) => axiosInstance.put<ProductDto>(`/api/products/${id}`, product);
export const deleteProduct = (id: number) => axiosInstance.delete<void>(`/api/products/${id}`); 