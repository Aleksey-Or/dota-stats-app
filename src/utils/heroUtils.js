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

    