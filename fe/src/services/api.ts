import axios from 'axios';
import { IProduct } from '../interfaces/product';

const API_BASE_URL = 'http://localhost:5001/api';

interface FetchProductsParams {
  code?: string;
  energyClass?: string;
  capacity?: string;
  features?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export const fetchProducts = async (params: FetchProductsParams): Promise<IProduct[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
