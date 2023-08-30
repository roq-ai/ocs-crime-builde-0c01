import { KnowledgeInterface } from 'interfaces/knowledge';
import { PlayerInterface } from 'interfaces/player';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CrimeInterface {
  id?: string;
  name: string;
  num_players: number;
  num_killers: number;
  victim_name: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  knowledge?: KnowledgeInterface[];
  player?: PlayerInterface[];
  organization?: OrganizationInterface;
  _count?: {
    knowledge?: number;
    player?: number;
  };
}

export interface CrimeGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  victim_name?: string;
  organization_id?: string;
}
