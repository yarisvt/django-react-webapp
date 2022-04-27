import React from 'react';
import CountryInfo from './CountryInfo';

export default function MoreOrLessItemToGuess({
  gameType,
  flagSrc,
  country,
  showHighScore = false,
  highScore,
  score,
  isBiggerCb,
  isSmallerCb,
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
        <div className='country-population'>Size:</div>
      </>
    );
  } else if (gameType === 'population') {
    countryInfo = (
      <>
        <div className='country-name'>{country}</div>
        <div className='country-population'>Population:</div>
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
        <CountryInfo
          countryInfo={countryInfo}
          isSmallerCb={isSmallerCb}
          isBiggerCb={isBiggerCb}
        />
      </div>
    </>
  );
}
