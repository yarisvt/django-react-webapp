import React, { useEffect, useState } from 'react';
import GameInfo from '../../components/game_info/GameInfo';
import './games.scss';

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/all-games')
      .then((res) => res.json())
      .then(setGames);
  }, []);

  return (
    <div className='games-container'>
      {games.map((game) => (
        <GameInfo key={game.id} {...game} />
      ))}
    </div>
  );
}
