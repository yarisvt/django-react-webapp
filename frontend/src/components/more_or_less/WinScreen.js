import React from 'react';
import { Link } from 'react-router-dom';

export default function WinScreen({ score, againCb }) {
  return (
    <div className='endscreen-container'>
      <div className='endscreen-score'>Score: {score}</div>
      <div className='endscreen-subtitle'>You beat the game!</div>
      <img className='icon' src='../icons/trophy.png' alt='Game banner' />
      <button className='btn-try-again' onClick={againCb}>
        Play Again
      </button>
      <Link
        to={'/games'}
        style={{ textDecoration: 'none' }}
        className='link-games'
      >
        Choose another game
      </Link>
    </div>
  );
}
