import React, { useState, useEffect, useRef } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import {
  shuffleArray,
  storeInLocalStoreAndUpdate,
  getFromLocalStore,
} from '../../utils/utils';
import './quiz.scss';

const countdownRenderer = ({ minutes, seconds }) => (
  <span>
    {zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);

const CountdownWrapper = ({ endedCb }) => {
  return (
    <Countdown
      date={Date.now() + 1000 * 60 * 20 - 1000}
      renderer={countdownRenderer}
      onComplete={endedCb}
    />
  );
};
const MemoCountdown = React.memo(CountdownWrapper);

export default function Quiz({ id, label, statExtra, data }) {
  const [countryData, setCountryData] = useState([]);
  const [index, setIndex] = useState(0);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [highScore, setHighScore] = useState(getFromLocalStore(id));
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);

  const textInputRef = useRef();

  useEffect(() => {
    setCountryData(shuffleArray(data));
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
      if (numberCorrect + 1 > highScore) {
        storeInLocalStoreAndUpdate(numberCorrect + 1, id, () =>
          setHighScore(highScore + 1)
        );
      }
      setNumberCorrect(numberCorrect + 1);
      setCountryData((prev) =>
        prev.map((country) => {
          if (country.country === countryData[index].country) {
            country.showCountry = true;
          }
          return country;
        })
      );

      if (numberCorrect === countryData.length - 1) {
        setShowEndScreen(true);
      }
      e.target.value = '';
      clickNextBtn();
    }
  };

  const clickCountry = (idx) => {
    textInputRef.current.value = '';
    textInputRef.current.focus();
    setIndex(idx);
  };

  const clickStart = () => {
    setShowStartButton(false);
  };

  return (
    <div className='quiz-page-container'>
      <div className='quiz-header-container'>
        {countryData.length > 0 && !showEndScreen && (
          <>
            <div className='quiz-info-container'>
              {showStartButton ? (
                <button className='quiz-button' onClick={clickStart}>
                  Start
                </button>
              ) : (
                <>
                  <div className='quiz-countdown-timer'>
                    <div>Time: </div>
                    <MemoCountdown endedCb={() => setShowEndScreen(true)} />
                  </div>
                  <div className='quiz-score-container'>
                    <div>Score:</div>
                    <div>
                      {numberCorrect}/{countryData.length}
                    </div>
                  </div>
                  <div className='quiz-score-container'>
                    <div>HighScore:</div>
                    <div>
                      {highScore}/{countryData.length}
                    </div>
                  </div>
                </>
              )}
            </div>
            {!showStartButton && (
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
                    autoFocus={true}
                    ref={textInputRef}
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
            )}
          </>
        )}
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
