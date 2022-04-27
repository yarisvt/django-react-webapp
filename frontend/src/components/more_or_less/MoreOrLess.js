import React, { useState, useRef, useEffect } from 'react';
import MoreOrLessItem from './MoreOrLessItem';
import './more-or-less.scss';
import EndScreen from './EndScreen';

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function storeInLocalStoreAndUpdate(highScore, gameType, cb) {
  localStorage.setItem(`highScore-${gameType}`, highScore);
  cb();
}

function getFromLocalStore(gameType) {
  const highScore = localStorage.getItem(`highScore-${gameType}`) || {};
  return highScore | 0;
}

export default function MoreOrLess({ gameType, data }) {
  const [leftItem, setLeftItem] = useState(getRandomItem(data));
  const [rightItem, setRightItem] = useState(getRandomItem(data));

  const [showButtonsLeft, setShowButtonsLeft] = useState(false);
  const [showButtonsRight, setShowButtonsRight] = useState(true);

  const [leftComponent, setLeftComponent] = useState();
  const [rightComponent, setRightComponent] = useState();

  const [showEndScreen, setShowEndScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getFromLocalStore(gameType));

  const gameItemLeft = useRef();
  const gameItemRight = useRef();

  const isBiggerCb = () => {
    setShowButtonsRight(false);
    setTimeout(() => {
      if (rightItem.stat > leftItem.stat) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, gameType, () =>
            setHighScore(highScore + 1)
          );
        }
        setScore(score + 1);
        // gameItemLeft.current.classList.add('transform-left');
        // gameItemRight.current.classList.add('transform-right');

        setTimeout(() => {
          // gameItemLeft.current.classList.remove('transform-left');
          // gameItemLeft.current.style.display = 'none';
          // gameItemRight.current.classList.remove('transform-right');
          setShowButtonsRight(true);
          setLeftItem({ ...rightItem });
          setRightItem(getRandomItem(data));
        }, 500);
      } else {
        setShowEndScreen(true);
      }
    }, 2000);
  };

  const isSmallerCb = () => {
    setShowButtonsRight(false);
    setTimeout(() => {
      if (rightItem.stat < leftItem.stat) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, gameType, () =>
            setHighScore(highScore + 1)
          );
        }
        // gameItemLeft.current.classList.add('transform-left');
        // gameItemRight.current.classList.add('transform-right');
        setTimeout(() => {
          // gameItemLeft.current.classList.remove('transform-left');
          // gameItemLeft.current.style.display = 'none';
          // gameItemRight.current.classList.remove('transform-right');
          setShowButtonsRight(true);
          setLeftItem({ ...rightItem });
          setRightItem(getRandomItem(data));
        }, 500);
      } else {
        setShowEndScreen(true);
      }
    }, 2000);
  };

  const endScreenCb = () => {
    setLeftItem(getRandomItem(data));
    setRightItem(getRandomItem(data));
    // setShowStat(false);
    setShowEndScreen(false);
    setScore(0);
  };

  useEffect(() => {
    setLeftComponent(
      <MoreOrLessItem
        gameType={gameType}
        flagSrc={`${
          window.location.origin
        }/img/flags/${leftItem.countryCode.toLowerCase()}.svg`}
        country={leftItem.country}
        stat={leftItem.stat}
        countryCode={leftItem.countryCode}
        countUp={false}
        guess={showButtonsLeft}
      />
    );
  }, [leftItem, showButtonsLeft]);

  useEffect(() => {
    setRightComponent(
      <MoreOrLessItem
        gameType={gameType}
        flagSrc={`${
          window.location.origin
        }/img/flags/${rightItem.countryCode.toLowerCase()}.svg`}
        country={rightItem.country}
        stat={rightItem.stat}
        countryCode={rightItem.countryCode}
        countUp={true}
        guess={showButtonsRight}
        isSmallerCb={isSmallerCb}
        isBiggerCb={isBiggerCb}
      />
    );
  }, [rightItem, showButtonsRight]);

  return (
    <>
      {showEndScreen ? (
        <EndScreen score={score} againCb={endScreenCb} />
      ) : (
        <div className='page-container'>
          <div className='score-container'>
            <div className='score-item'>
              <div className='score-count'>{score}</div>
              <div className='score-label'>Score</div>
            </div>
            <div className='highscore-item'>
              <div className='highscore-count'>{highScore}</div>
              <div className='highscore-label'>Highscore</div>
            </div>
          </div>
          <div className='game-container'>
            <div className='game-item game-item-left' ref={gameItemLeft}>
              {leftComponent}
            </div>
            <div className='game-item game-item-right' ref={gameItemRight}>
              {rightComponent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
