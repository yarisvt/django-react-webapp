import React from 'react';
import CountUp from 'react-countup';

export default function MoreOrLessItem({
  gameType,
  flagSrc,
  country,
  stat,
  countUp = true,
  guess = false,
  isSmallerCb,
  isBiggerCb,
}) {
  let countryInfo;
  if (gameType === 'area') {
    countryInfo = (
      <>
        <div className='country-name'>{country}</div>
        <div className='country-area'>Size:</div>
        {guess === true ? (
          <>
            <button onClick={isSmallerCb} className='btn-smaller'>
              Smaller
            </button>
            <button onClick={isBiggerCb} className='btn-bigger'>
              Bigger
            </button>
          </>
        ) : (
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
        )}
      </>
    );
  } else if (gameType === 'population') {
    // console.log('here', countUp, guess);
    countryInfo = (
      <>
        <div className='country-name'>{country}</div>
        <div className='country-population'>Population:</div>
        {guess === true ? (
          <>
            <button onClick={isSmallerCb} className='btn-smaller'>
              Smaller
            </button>
            <button onClick={isBiggerCb} className='btn-bigger'>
              Bigger
            </button>
          </>
        ) : (
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
        )}
      </>
    );
  } else {
    countryInfo = <></>;
  }

  return (
    <div className='country-item'>
      <div className='country-flag-container'>
        <img className='country-flag' src={flagSrc} />
      </div>
      <div className='country-info-container'>{countryInfo}</div>
    </div>
  );
}
