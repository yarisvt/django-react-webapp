import React, { useEffect, useState } from 'react';
import Parser from 'html-react-parser';
import CountUp from 'react-countup';

export default function MoreOrLessItem({
  flagSrc,
  country,
  stat,
  label,
  statExtra,
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

  return (
    <div className='country-item'>
      <div className='country-flag-container'>
        <img className='country-flag' src={flagSrc} />
      </div>
      <div className='country-info-container'>
        <div className='country-name'>{country}</div>
        <div className='country-label'>{label}</div>
        {showButtons === true ? (
          buttons
        ) : (
          <div className='country-stat'>
            {countryStat} {statExtra && Parser(statExtra)}
          </div>
        )}
      </div>
    </div>
  );
}
