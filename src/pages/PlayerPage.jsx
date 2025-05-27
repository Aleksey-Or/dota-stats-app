import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PlayerOverview from '../components/PlayerOverview';
import MatchesList from '../components/MatchesList';
import { getPlayer, getMatches, getHeroes } from "../utils/api";
import { setHeroMap } from "../utils/heroUtils";

const PlayerPage = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [playerData, matchList, heroList] = await Promise.all([
                getPlayer(id),
                getMatches(id),
                getHeroes(),
            ]);
            setPlayer(playerData);
            setMatches(matchList);
            setHeroMap(heroList); // сохраняет в utils глобальную карту героев
        };

        fetchData();
    }, [id]);

    if (!player) return <p>Loading player info...</p>;

    return (
        <div className="container">
            <PlayerOverview data={player} />
            <MatchesList matches={matches} />
        </div>
    );
};

export default PlayerPage;
