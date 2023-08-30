import axios from 'axios';
import queryString from 'query-string';
import { CrimeInterface, CrimeGetQueryInterface } from 'interfaces/crime';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCrimes = async (query?: CrimeGetQueryInterface): Promise<PaginatedInterface<CrimeInterface>> => {
  const response = await axios.get('/api/crimes', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCrime = async (crime: CrimeInterface) => {
  const response = await axios.post('/api/crimes', crime);
  return response.data;
};

export const updateCrimeById = async (id: string, crime: CrimeInterface) => {
  const response = await axios.put(`/api/crimes/${id}`, crime);
  return response.data;
};

export const getCrimeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crimes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCrimeById = async (id: string) => {
  const response = await axios.delete(`/api/crimes/${id}`);
  return response.data;
};
