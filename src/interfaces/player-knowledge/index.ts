import { PlayerInterface } from 'interfaces/player';
import { KnowledgeInterface } from 'interfaces/knowledge';
import { GetQueryInterface } from 'interfaces';

export interface PlayerKnowledgeInterface {
  id?: string;
  player_id: string;
  knowledge_id: string;
  created_at?: any;
  updated_at?: any;

  player?: PlayerInterface;
  knowledge?: KnowledgeInterface;
  _count?: {};
}

export interface PlayerKnowledgeGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  knowledge_id?: string;
}
