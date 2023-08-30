import { PlayerKnowledgeInterface } from 'interfaces/player-knowledge';
import { CrimeInterface } from 'interfaces/crime';
import { GetQueryInterface } from 'interfaces';

export interface KnowledgeInterface {
  id?: string;
  name: string;
  type: string;
  num_witnesses: number;
  num_characters: number;
  witness_text: string;
  self_text: string;
  crime_id: string;
  created_at?: any;
  updated_at?: any;
  player_knowledge?: PlayerKnowledgeInterface[];
  crime?: CrimeInterface;
  _count?: {
    player_knowledge?: number;
  };
}

export interface KnowledgeGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  witness_text?: string;
  self_text?: string;
  crime_id?: string;
}
