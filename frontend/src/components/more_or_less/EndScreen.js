import React from 'react';
import { Link } from 'react-router-dom';

function getSubTitleAndMedal(score) {
  let subTitle;
  let medal;

  if (score < 10) {
    subTitle = 'Better luck next time!';
    medal = null;
  } else if (score >= 10 && score < 25) {
    subTitle = 'Well done!';
    medal = '../icons/bronze-medal.png';
  } else if (score >= 25 && score < 50) {
    subTitle = 'You are really getting there!';
    medal = '../icons/silver-medal.png';
  } else if (score >= 50) {
    subTitle = 'Superb job!';
    medal = '../icons/gold-medal.png';
  }

  return [subTitle, medal];
}

export default function EndScreen({ score, againCb }) {
  const [subTitle, medal] = getSubTitleAndMedal(score);

  return (
    <div className='endscreen-container'>
      <div className='endscreen-score'>Score: {score}</div>
      <div className='endscreen-subtitle'>{subTitle}</div>
      <>{medal && <img className='icon' src={medal} alt='Game banner' />}</>
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
