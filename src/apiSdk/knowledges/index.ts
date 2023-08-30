import axios from 'axios';
import queryString from 'query-string';
import { KnowledgeInterface, KnowledgeGetQueryInterface } from 'interfaces/knowledge';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getKnowledges = async (
  query?: KnowledgeGetQueryInterface,
): Promise<PaginatedInterface<KnowledgeInterface>> => {
  const response = await axios.get('/api/knowledges', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createKnowledge = async (knowledge: KnowledgeInterface) => {
  const response = await axios.post('/api/knowledges', knowledge);
  return response.data;
};

export const updateKnowledgeById = async (id: string, knowledge: KnowledgeInterface) => {
  const response = await axios.put(`/api/knowledges/${id}`, knowledge);
  return response.data;
};

export const getKnowledgeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/knowledges/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteKnowledgeById = async (id: string) => {
  const response = await axios.delete(`/api/knowledges/${id}`);
  return response.data;
};
