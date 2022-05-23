import React, { useState, useEffect } from 'react';
import { getRandomItem, shuffleArray } from '../../utils/utils';
import './quiz.scss';

export default function Quiz({ id, label, statExtra, data }) {
  const [countryData, setCountryData] = useState([]);
  const [index, setIndex] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);

  useEffect(() => {
    const shuffeledData = shuffleArray(data);
    setCountryData(shuffeledData);
  }, []);

  const clickPrevBtn = () => {
    const start = index === 0 ? countryData.length - 1 : index - 1;
    for (let i = start; i >= 0; i--) {
      const countryItem = countryData[i];
      if (countryItem.showCountry == undefined) {
        setIndex(i);
        return;
      }
    }
  };

  const clickNextBtn = () => {
    const start = index === countryData.length - 1 ? 0 : index + 1;
    for (let i = start; i < countryData.length; i++) {
      const countryItem = countryData[i];
      if (countryItem.showCountry == undefined) {
        setIndex(i);
        return;
      }
    }
  };

  const checkAnswer = (e) => {
    const countryInput = e.target.value.toLowerCase().replace(/ /g, '');
    const correctAnswers = [
      countryData[index].country.toLowerCase().replace(/ /g, ''),
      ...countryData[index].countryAliases.map((alias) =>
        alias.toLowerCase().replace(/ /g, '')
      ),
    ];
    if (correctAnswers.includes(countryInput)) {
      setCountryData((prev) =>
        prev.map((country) => {
          if (country.country === countryData[index].country) {
            country.showCountry = true;
          }
          return country;
        })
      );

      let numberCorrect = 0;
      countryData.forEach((country) => {
        if (country.showCountry === true) {
          numberCorrect++;
        }
      });
      if (numberCorrect === countryData.length - 1) {
        setShowEndScreen(true);
      }
      e.target.value = '';
      clickNextBtn();
    }
  };

  const clickCountry = (idx) => {
    setIndex(idx);
  };

  return (
    <div className='quiz-page-container'>
      <div className='quiz-input-container'>
        {countryData.length > 0 && !showEndScreen && (
          <div className='quiz-input-container'>
            <img
              className='quiz-country-flag'
              src={`${window.location.origin}/img/flags/${countryData[
                index
              ].countryCode.toLowerCase()}.svg`}
            />
            <button className='quiz-button' onClick={clickPrevBtn}>
              &lsaquo; Prev
            </button>
            <div className='quiz-input'>
              <label htmlFor='country' className='quiz-input-label'>
                Country:
              </label>
              <input
                autoComplete='off'
                type='text'
                name='country'
                className='quiz-input-box'
                onChange={checkAnswer}
              />
            </div>
            <button className='quiz-button' onClick={clickNextBtn}>
              Next &rsaquo;
            </button>
          </div>
        )}{' '}
        {showEndScreen && <div className='quiz-finished'>Well done!</div>}
      </div>
      <div className='quiz-flags-container'>
        {countryData.length > 0 &&
          countryData.map((country, idx) => (
            <div key={idx} className='quiz-country-item'>
              <img
                onClick={() => clickCountry(idx)}
                className='quiz-country-flag'
                src={`${
                  window.location.origin
                }/img/flags/${country.countryCode.toLowerCase()}.svg`}
              />
              <div>{country.showCountry && country.country}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
