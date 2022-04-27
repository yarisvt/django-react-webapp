import React, { useEffect } from 'react';

export default function CountryInfo({
  countryInfo,
  isSmallerCb,
  isBiggerCb,
  cb,
}) {
  return (
    <div className='country-info-container'>
      {countryInfo}
      <button onClick={isSmallerCb} className='btn-smaller'>
        Smaller
      </button>
      <button onClick={isBiggerCb} className='btn-bigger'>
        Bigger
      </button>
    </div>
  );
}
