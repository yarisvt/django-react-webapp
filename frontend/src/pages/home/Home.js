import React from 'react';
import { Link } from 'react-router-dom';

import './home.scss';

export default function Home() {
  return (
    <div className='content'>
      <h1 className='title'>
        <span className='title-more'>MORE</span>
        <span className='title-or'> OR </span>
        <span className='title-less'>LESS</span>
      </h1>
      <Link to='/games'>
        <button className='btn-play'>Play</button>
      </Link>
    </div>
  );
}
