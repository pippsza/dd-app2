type AllTees = OneTee[];
type OneTee = {
  status: string;
  playing_map: string;
  playing_server: string;

  profile: oneTeeProfile;
  general_activity: {
    total_seconds_played: number;
    start_of_playtime: string;
  };
  most_played_locations: OneTeeMostPlayed[];
  most_played_categories: OneTeeMostPlayed[];
  most_played_gametypes: OneTeeMostPlayed[];
  most_played_maps: OneTeeMostPlayedMaps[];
  recent_player_info: recentPlayerInfo[];
  favourite_teammates: favouriteTeammates[];
};
type favouriteTeammates = { name: string };
type recentPlayerInfo = {
  skin_name: string;
  skin_color_body: number;
  skin_color_feet: number;
};
type oneTeeProfile = {
  name: string;
  points: number;
  clan: string;
  skin_name: string;
  skin_color_body: string;
  skin_color_feet: string;
};
type OneTeeMostPlayed = { key: string; seconds_played: number };
type OneTeeMostPlayedMaps = { map_name: string; seconds_played: number };
