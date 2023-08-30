import axios from 'axios';
import queryString from 'query-string';
import { PlayerKnowledgeInterface, PlayerKnowledgeGetQueryInterface } from 'interfaces/player-knowledge';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPlayerKnowledges = async (
  query?: PlayerKnowledgeGetQueryInterface,
): Promise<PaginatedInterface<PlayerKnowledgeInterface>> => {
  const response = await axios.get('/api/player-knowledges', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPlayerKnowledge = async (playerKnowledge: PlayerKnowledgeInterface) => {
  const response = await axios.post('/api/player-knowledges', playerKnowledge);
  return response.data;
};

export const updatePlayerKnowledgeById = async (id: string, playerKnowledge: PlayerKnowledgeInterface) => {
  const response = await axios.put(`/api/player-knowledges/${id}`, playerKnowledge);
  return response.data;
};

export const getPlayerKnowledgeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-knowledges/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlayerKnowledgeById = async (id: string) => {
  const response = await axios.delete(`/api/player-knowledges/${id}`);
  return response.data;
};
