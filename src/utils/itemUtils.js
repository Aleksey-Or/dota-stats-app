import items from './items.json';

const itemMap = new Map();

(() => {
  for (const [name, data] of Object.entries(items)) {
    itemMap.set(data.id, { name, data });
  }
})();

export const getItemIconUrl = (itemId) => {
  const item = itemMap.get(itemId);
  if (!item) {
    return "https://via.placeholder.com/32?text=?";
  }
  return "https://cdn.dota2.com" + item.data.img;
};
