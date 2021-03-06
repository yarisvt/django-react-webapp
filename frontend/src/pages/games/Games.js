import React, { useEffect, useState } from 'react';
import GameInfo from '../../components/game_info/GameInfo';
import './games.scss';

export default function Games({ gameType }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/all-games`)
      .then((res) => res.json())
      .then(setGames);
  }, []);

  return (
    <div className='games-container'>
      {games &&
        games
          .filter((game) => game.gameType === gameType)
          .map((game) => <GameInfo key={game.id} {...game} />)}
    </div>
  );
}
