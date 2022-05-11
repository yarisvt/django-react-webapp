import React, { useState, useRef } from 'react';
import MoreOrLessItem from './MoreOrLessItem';
import './more-or-less.scss';
import EndScreen from './EndScreen';
import {
  getRandomItem,
  storeInLocalStoreAndUpdate,
  getFromLocalStore,
  sleep,
} from '../../utils/utils.js';

export default function MoreOrLess({ gameType, label, statExtra, data }) {
  const [items, setItems] = useState([
    getRandomItem(data),
    getRandomItem(data, 182),
    getRandomItem(data),
  ]);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getFromLocalStore(gameType));

  const divider = useRef();

  const clickButtonCb = (btnType, callback) => {
    const countryItems = [...document.querySelectorAll('.country-item')];

    setTimeout(async () => {
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

      if (isCorrect) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, gameType, () =>
            setHighScore(highScore + 1)
          );
        }
        setScore(score + 1);
        divider.current.style.display = 'none';

        for (let i = -25; i <= 25; i++) {
          countryItems.forEach((c) => (c.style.right = `${i}%`));
          await sleep(15);
        }
        divider.current.style.display = 'inherit';
        countryItems.forEach((c) => (c.style.right = '-25%'));
        setItems((prev) => [prev[1], prev[2], getRandomItem(data)]);
        callback();
      } else {
        setShowEndScreen(true);
      }
    }, 2000);
  };

  const endScreenCb = () => {
    setShowEndScreen(false);
    setItems([getRandomItem(data), getRandomItem(data), getRandomItem(data)]);
    setScore(0);
  };

  return (
    <>
      {showEndScreen ? (
        <EndScreen score={score} againCb={endScreenCb} />
      ) : (
        <div className='page-container' style={{ overflow: 'hidden' }}>
          <div className='score-container'>
            <div className='score-item'>
              <div className='score-count'>{score}</div>
              <div className='score-label'>Score</div>
            </div>
            <div className='divider' ref={divider}></div>
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
