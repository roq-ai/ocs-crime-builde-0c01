import { PlayerKnowledgeInterface } from 'interfaces/player-knowledge';
import { UserInterface } from 'interfaces/user';
import { CrimeInterface } from 'interfaces/crime';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  name: string;
  personality_trait: string;
  user_id: string;
  crime_id: string;
  created_at?: any;
  updated_at?: any;
  player_knowledge?: PlayerKnowledgeInterface[];
  user?: UserInterface;
  crime?: CrimeInterface;
  _count?: {
    player_knowledge?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  personality_trait?: string;
  user_id?: string;
  crime_id?: string;
}
