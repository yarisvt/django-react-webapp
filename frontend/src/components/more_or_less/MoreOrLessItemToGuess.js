import React, { useRef } from 'react';

export default function MoreOrLessItemToGuess({
  gameType,
  flagSrc,
  country,
  isBiggerCb,
  isSmallerCb,
}) {
  const countryItemRef = useRef();

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
      <div className='country-item' ref={countryItemRef}>
        <div className='country-flag-container'>
          <img className='country-flag' src={flagSrc} />
        </div>
        <div className='country-info-container'>
          {countryInfo}
          <button onClick={isSmallerCb} className='btn-smaller'>
            Smaller
          </button>
          <button onClick={isBiggerCb} className='btn-bigger'>
            Bigger
          </button>
        </div>
      </div>
    </>
  );
}
