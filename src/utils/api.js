import axios from 'axios';

const BASE_URL = 'https://api.opendota.com/api';

export const getPlayer = async (id) => {
  const res = await axios.get(`${BASE_URL}/players/${id}`);
  return res.data;
};

export const getMatches = async (id) => {
  const res = await axios.get(`${BASE_URL}/players/${id}/recentMatches`);
  return res.data;
};

export const getHeroes = async () => {
    const res = await fetch("https://api.opendota.com/api/heroes");
    return res.json();
  };
  export const getMatchDetails = async (matchId) => {
    const response = await fetch(`https://api.opendota.com/api/matches/${matchId}`);
    return response.json();
};
let heroMap = {};

export const setHeroMap = (heroes) => {
  heroMap = {};
  heroes.forEach((h) => {
    heroMap[h.id] = h;
  });
};

export const getHeroName = (id) => heroMap[id]?.localized_name || "Unknown";
export const getHeroIconUrl = (id) =>
  heroMap[id]
    ? `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroMap[id].name.replace("npc_dota_hero_", "")}.png`
    : "";
