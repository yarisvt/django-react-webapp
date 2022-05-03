import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

export default function MoreOrLessItem({
  gameType,
  flagSrc,
  country,
  stat,
  countUp = true,
  guess = false,
  buttonCb,
}) {
  const [countryStat, setCountryStat] = useState();
  const [showButtons, setShowButtons] = useState(guess);

  useEffect(() => {
    if (countUp === true) {
      setCountryStat(
        <CountUp
          start={0}
          end={stat}
          duration={1.5}
          formattingFn={(num) => num.toLocaleString()}
        />
      );
    } else {
      setCountryStat(stat.toLocaleString());
    }
  }, [stat]);

  const buttons = (
    <>
      <button
        onClick={() => {
          setShowButtons(false);
          buttonCb('smaller', () => setShowButtons(true));
        }}
        className='btn-smaller'
      >
        Smaller
      </button>
      <button
        onClick={() => {
          setShowButtons(false);
          buttonCb('bigger', () => setShowButtons(true));
        }}
        className='btn-bigger'
      >
        Bigger
      </button>
    </>
  );

  let countryInfo;
  if (gameType === 'area') {
    countryInfo = (
      <>
        <div className='country-name'>{country}</div>
        <div className='country-area'>Size:</div>
        {showButtons === true ? (
          buttons
        ) : (
          <div className='country-stat'>
            {countryStat}
            <span>
              Km<sup>2</sup>
            </span>
          </div>
        )}
      </>
    );
  } else if (gameType === 'population') {
    countryInfo = (
      <>
        <div className='country-name'>{country}</div>
        <div className='country-population'>Population:</div>
        {showButtons === true ? (
          buttons
        ) : (
          <div className='country-stat'>{countryStat}</div>
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
