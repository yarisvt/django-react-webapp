import React from 'react';
import CountUp from 'react-countup';

export default function MoreOrLessItem({
  gameType,
  flagSrc,
  country,
  stat,
  showHighScore = false,
  highScore,
  score,
  countUp = true,
}) {
  let scoreItem;
  if (showHighScore) {
    scoreItem = (
      <>
        <div className='highscore-count'>{highScore}</div>
        <div className='highscore-label'>Highscore</div>
      </>
    );
  } else {
    scoreItem = (
      <>
        <div className='score-count'>{score}</div>
        <div className='score-label'>Score</div>
      </>
    );
  }
  let countryInfo;
  if (gameType === 'area') {
    countryInfo = (
      <>
        <div className='country-name'>{country}</div>
        <div className='country-area'>Size:</div>
        <div className='country-stat'>
          {countUp === true ? (
            <CountUp
              start={0}
              end={stat}
              duration={1.5}
              formattingFn={(num) => num.toLocaleString()}
            />
          ) : (
            stat.toLocaleString()
          )}
          <span>
            Km<sup>2</sup>
          </span>
        </div>
      </>
    );
  } else if (gameType === 'population') {
    countryInfo = (
      <>
        <div className='country-name'>{country}</div>
        <div className='country-population'>Population:</div>
        <div className='country-stat'>
          {countUp === true ? (
            <CountUp
              start={0}
              end={stat}
              duration={1.5}
              formattingFn={(num) => num.toLocaleString()}
            />
          ) : (
            stat.toLocaleString()
          )}
        </div>
      </>
    );
  } else {
    countryInfo = <></>;
  }

  return (
    <>
      <div className='score-item'>{scoreItem}</div>
      <div className='country-item'>
        <div className='country-flag-container'>
          <img className='country-flag' src={flagSrc} />
        </div>
        <div className='country-info-container'>{countryInfo}</div>
      </div>
    </>
  );
}
