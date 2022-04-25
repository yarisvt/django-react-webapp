import React from 'react';
import './game-info.scss';
import { Link } from 'react-router-dom';

export default function GameInfo({ title, subtitle, imageSource, urlTo }) {
  return (
    <Link to={urlTo} style={{ textDecoration: 'none' }} className='game-item'>
      <img className='game-banner' src={imageSource} alt='Game banner' />
      <div className='game-content'>
        <h2 className='game-title'>{title}</h2>
        <h4 className='game-subtitle'>{subtitle}</h4>
      </div>
    </Link>
  );
}
