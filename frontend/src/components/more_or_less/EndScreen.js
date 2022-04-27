import React from 'react';
import { Link } from 'react-router-dom';

export default function EndScreen({ score, againCb }) {
  return (
    <div className='endscreen-container'>
      <div className='endscreen-score'>Score: {score}</div>
      <div className='endscreen-subtitle'>Better luck next time!</div>
      <button className='btn-try-again' onClick={againCb}>
        Try Again
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
