import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './game.scss';

export default function Game() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/game-info?game-id=${id}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      {data.length > 0 && (
        <div className='page-container'>
          <div className='left-container'>
            <div className='score-item'>
              <div className='highscore-count'>0</div>
              <div className='highscore-label'>Highscore</div>
            </div>
            <div className='country-item'>
              <img
                className='country-flag'
                src={`${
                  window.location.origin
                }/img/flags/${data[0].country_code.toLowerCase()}.svg`}
              />
              <div className='country-name'>{data[0].country}</div>
              <div className='country-stat'>
                {data[1].stat.toLocaleString()}{' '}
                {data[1].area && (
                  <span>
                    Km<sup>2</sup>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='right-container'>
            <div className='score-item'>
              <div className='highscore-count'>0</div>
              <div className='highscore-label'>Score</div>
            </div>
            <div className='country-item'>
              <img
                className='country-flag'
                src={`${
                  window.location.origin
                }/img/flags/${data[1].country_code.toLowerCase()}.svg`}
              />
              <div className='country-name'>{data[1].country}</div>
              <div className='country-stat'>
                {data[1].stat.toLocaleString()}{' '}
                {data[1].area && (
                  <span>
                    Km<sup>2</sup>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
