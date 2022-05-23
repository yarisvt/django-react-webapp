import React, { useState, useRef } from 'react';
import MoreOrLessItem from './MoreOrLessItem';
import './more-or-less.scss';
import EndScreen from './EndScreen';
import {
  storeInLocalStoreAndUpdate,
  getFromLocalStore,
  sleep,
  shuffleArray,
} from '../../utils/utils.js';
import WinScreen from './WinScreen';

export default function MoreOrLess({ id, label, statExtra, data }) {
  const [shuffledData, setShuffledData] = useState(shuffleArray(data));

  const [items, setItems] = useState(() => {
    const items = [shuffledData[0], shuffledData[1], shuffledData[2]];
    setShuffledData((prevData) => prevData.slice(3, prevData.length));
    return items;
  });
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);

  const correctButton = useRef();
  const incorrectButton = useRef();

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getFromLocalStore(id));

  const divider = useRef();
  const clickButtonCb = (btnType, callback) => {
    const countryItems = [...document.querySelectorAll('.country-item')];

    let isCorrect = true;
    if (btnType === 'bigger') {
      if (items[1].stat < items[0].stat) {
        isCorrect = false;
      }
    } else {
      if (items[1].stat > items[0].stat) {
        isCorrect = false;
      }
    }
    setTimeout(async () => {
      if (isCorrect) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, id, () =>
            setHighScore(highScore + 1)
          );
        }
        correctButton.current.classList.add('show');
        setScore(score + 1);
        divider.current.style.display = 'none';

        if (shuffledData.length === 0) {
          setShowWinScreen(true);
          return;
        }

        for (let i = -25; i <= 25; i++) {
          countryItems.forEach((c) => (c.style.right = `${i}%`));
          await sleep(15);
        }
        correctButton.current.classList.remove('show');

        divider.current.style.display = 'inherit';
        countryItems.forEach((c) => (c.style.right = '-25%'));
        setItems((prev) => {
          const items = [prev[1], prev[2], shuffledData[0]];
          setShuffledData((prevData) => prevData.slice(1, prevData.length));
          return items;
        });
        callback();
      } else {
        incorrectButton.current.classList.add('show');
        await sleep(1000);
        setShowEndScreen(true);
        incorrectButton.current.classList.remove('show');
      }
    }, 1700);
  };

  const endScreenCb = () => {
    setShowEndScreen(false);
    setShowWinScreen(false);

    const newShuffledData = shuffleArray(data);
    setShuffledData(newShuffledData);

    setItems(() => {
      const items = [
        newShuffledData[0],
        newShuffledData[1],
        newShuffledData[2],
      ];
      setShuffledData((prevData) => prevData.slice(3, prevData.length));
      return items;
    });
    setScore(0);
  };

  return (
    <>
      {showEndScreen ? (
        <EndScreen score={score} againCb={endScreenCb} />
      ) : showWinScreen ? (
        <WinScreen score={score} againCb={endScreenCb} />
      ) : (
        <div className='page-container' style={{ overflow: 'hidden' }}>
          <div className='score-container'>
            <div className='score-item'>
              <div className='score-count'>{score}</div>
              <div className='score-label'>Score</div>
            </div>
            <div className='divider' ref={divider}></div>
            <>
              <img
                ref={incorrectButton}
                className='icon incorrect-correct'
                src='../icons/incorrect-answer.png'
                alt='Game banner'
              />
              <img
                ref={correctButton}
                className='icon incorrect-correct'
                src='../icons/correct-answer.png'
                alt='Game banner'
              />
            </>
            <div className='highscore-item'>
              <div className='highscore-count'>{highScore}</div>
              <div className='highscore-label'>Highscore</div>
            </div>
          </div>
          <div className='game-container'>
            {items.map((item, idx) => {
              return (
                <MoreOrLessItem
                  key={idx}
                  className={
                    idx === items.length - 1
                      ? 'country-item last'
                      : 'country-item'
                  }
                  flagSrc={`${
                    window.location.origin
                  }/img/flags/${item.countryCode.toLowerCase()}.svg`}
                  country={item.country}
                  stat={item.stat}
                  label={label}
                  statExtra={statExtra}
                  countUp={idx === 0 ? false : true}
                  guess={idx === 0 ? false : true}
                  buttonCb={clickButtonCb}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
