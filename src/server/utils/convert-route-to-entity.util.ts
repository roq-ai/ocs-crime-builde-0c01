const mapping: Record<string, string> = {
  crimes: 'crime',
  knowledges: 'knowledge',
  organizations: 'organization',
  players: 'player',
  'player-knowledges': 'player_knowledge',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
