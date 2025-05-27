import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMatchDetails } from "../utils/api";
import { getItemIconUrl } from '../utils/itemUtils';

import heroesData from "../utils/heroes.json";
import { setHeroMap } from "../utils/heroUtils";

const MatchPage = () => {
  const { match_id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroMap, setLocalHeroMap] = useState({});

  useEffect(() => {
    const heroArray = Object.values(heroesData);
    const map = {};
    heroArray.forEach(hero => {
      map[Number(hero.id)] = hero;
    });
    setLocalHeroMap(map);
    setHeroMap(heroArray);
  }, []);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const data = await getMatchDetails(match_id);
        setMatch(data);
      } catch (error) {
        console.error("Error loading match details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
  }, [match_id]);

  if (loading) return <p>Loading match details...</p>;
  if (!match) return <p>Match data not found.</p>;

  const players = match.players || [];
  const durationMinutes = Math.floor(match.duration / 60);
  const durationSeconds = match.duration % 60;

  const radiantPlayers = players.filter(p => p.player_slot < 128);
  const direPlayers = players.filter(p => p.player_slot >= 128);

  const getHeroName = (hero_id) => {
    return heroMap[hero_id]?.localized_name || "Unknown";
  };

  const getHeroIconUrl = (hero_id) => {
    return heroMap[hero_id]?.icon
      ? `https://cdn.cloudflare.steamstatic.com${heroMap[hero_id].icon}`
      : "";
  };

  const renderPlayerRow = (player) => {
    const hero = heroMap[player.hero_id];
    return (
      <tr key={player.account_id ?? player.player_slot}>
        <td style={{ padding: "8px" }}>
          {player.personaname || "Anonymous"}
        </td>
        <td style={{ padding: "8px", display: "flex", alignItems: "center", gap: 5 }}>
          {hero ? (
            <>
              <img
                src={getHeroIconUrl(player.hero_id)}
                alt={getHeroName(player.hero_id)}
                style={{ width: 24, height: 24 }}
              />
              {getHeroName(player.hero_id)}
            </>
          ) : (
            "Unknown"
          )}
        </td>
        <td style={{ padding: "8px" }}>
          {player.kills}/{player.deaths}/{player.assists}
        </td>
        <td style={{ padding: "8px" }}>{player.level}</td>
        <td style={{ padding: "8px" }}>{player.gold}</td>
        <td style={{ padding: "8px" }}>{player.gold_per_min}</td>
        <td style={{ padding: "8px" }}>{player.xp_per_min}</td>
        <td style={{ padding: "8px", display: "flex", gap: "6px" }}>
          {[player.item_0, player.item_1, player.item_2, player.item_3, player.item_4, player.item_5]
            .filter(itemId => itemId !== 0)
            .map((itemId, idx) => (
              <img
                key={idx}
                src={getItemIconUrl(itemId)}
                alt={`Item ${itemId}`}
                style={{ width: "32px", height: "32px" }}
              />
            ))}
        </td>
      </tr>
    );
  };
  

  // Определяем победившую команду
  const winningTeam = match.radiant_win ? "Radiant" : "Dire";

  // Цвета для фона команд (светлые, приятные)
  const radiantBgColor = "#d6f5d6"; // мягкий зелёный
  const direBgColor = "#f5d6d6";    // мягкий красный

  const tableStyleBase = {
    width: "100%",
    tableLayout: "fixed", // фиксированное распределение
    borderCollapse: "seperate",
    marginTop: "1rem",
    marginBottom: "2rem",
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "1200px", margin: "auto", overflowX: "auto" }}
    >
      <h2>Match {match.match_id}</h2>
      <p>
        Duration: {durationMinutes}m {durationSeconds}s
      </p>
      <p>
        <strong>Winning Team: </strong>{winningTeam}
      </p>

      <h3>Radiant Team</h3>
      <table className="radiant-bg">
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px" }}>Player</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Hero</th>
            <th style={{ textAlign: "left", padding: "8px" }}>K/D/A</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Level</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Gold</th>
            
            <th style={{ textAlign: "left", padding: "8px" }}>GPM</th>
            <th style={{ textAlign: "left", padding: "8px" }}>XPM</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Items</th>
          </tr>
        </thead>
        <tbody>{radiantPlayers.map(renderPlayerRow)}</tbody>
      </table>

      <h3>Dire Team</h3>
      <table className="dire-bg">
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px" }}>Player</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Hero</th>
            <th style={{ textAlign: "left", padding: "8px" }}>K/D/A</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Level</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Gold</th>
            
            <th style={{ textAlign: "left", padding: "8px" }}>GPM</th>
            <th style={{ textAlign: "left", padding: "8px" }}>XPM</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Items</th>
          </tr>
        </thead>
        <tbody>{direPlayers.map(renderPlayerRow)}</tbody>
      </table>
    </div>
  );
};

export default MatchPage;
