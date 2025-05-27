import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroesData from '../utils/heroes.json'; // твой JSON с героями
import {
  getHeroName,
  getHeroImageUrl,
  setHeroMap,
  getHeroIconUrl
} from '../utils/heroUtils';

const MatchesList = ({ matches }) => {
  useEffect(() => {
    // Загружаем карту героев из JSON при монтировании
    setHeroMap(Object.values(heroesData));
  }, []);

  return (
    <div>
      <h3>Recent Matches</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px' }}>Match ID</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Hero</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>K/D/A</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.match_id} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '8px' }}>
                <Link
                  to={`/match/${match.match_id}`}
                  style={{ color: '#3b82f6', textDecoration: 'none' }}
                >
                  {match.match_id}
                </Link>
              </td>
              <td style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                <img
                  src={getHeroIconUrl(match.hero_id)}
                  alt={getHeroName(match.hero_id)}
                  style={{ width: '60px', height: '40px', marginRight: '10px' }}
                />
                {getHeroName(match.hero_id)}
              </td>
              <td style={{ padding: '8px' }}>
                {match.kills}/{match.deaths}/{match.assists}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesList;
