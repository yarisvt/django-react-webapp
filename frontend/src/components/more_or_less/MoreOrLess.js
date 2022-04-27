import React, { useState, useRef } from 'react';
import MoreOrLessItem from './MoreOrLessItem';
import './more-or-less.scss';
import MoreOrLessItemToGuess from './MoreOrLessItemToGuess';
import EndScreen from './EndScreen';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  const [showStat, setShowStat] = useState(false);
  const [leftItem, setLeftItem] = useState(getRandomItem(data));
  const [rightItem, setRightItem] = useState(getRandomItem(data));
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getFromLocalStore(gameType));

  const leftRef = useRef();
  const rightRef = useRef();

  const isBiggerCb = () => {
    setShowStat(true);
    setTimeout(() => {
      if (rightItem.stat > leftItem.stat) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, gameType, () =>
            setHighScore(highScore + 1)
          );
        }
        setScore(score + 1);
        leftRef.current.classList.add('exit-active');
        rightRef.current.classList.add('exit-active');
        setTimeout(() => {
          leftRef.current.classList.remove('exit-active');
          rightRef.current.classList.remove('exit-active');
          setLeftItem(rightItem);
          setRightItem(getRandomItem(data));
          setShowStat(false);
        }, 500);
      } else {
        setShowEndScreen(true);
      }
    }, 2000);
  };

  const isSmallerCb = () => {
    setShowStat(true);
    setTimeout(() => {
      if (rightItem.stat < leftItem.stat) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, gameType, () =>
            setHighScore(highScore + 1)
          );
        }
        leftRef.current.classList.add('exit-active');
        rightRef.current.classList.add('exit-active');
        setTimeout(() => {
          setLeftItem(rightItem);
          setRightItem(getRandomItem(data));
          setShowStat(false);
          leftRef.current.classList.remove('exit-active');
          rightRef.current.classList.remove('exit-active');
        }, 500);
      } else {
        setShowEndScreen(true);
      }
    }, 2000);
  };

  const endScreenCb = () => {
    setLeftItem(getRandomItem(data));
    setRightItem(getRandomItem(data));
    setShowStat(false);
    setShowEndScreen(false);
    setScore(0);
  };

  let rightItemComponent;
  if (showStat) {
    rightItemComponent = (
      <MoreOrLessItem
        gameType={gameType}
        flagSrc={`${
          window.location.origin
        }/img/flags/${rightItem.countryCode.toLowerCase()}.svg`}
        country={rightItem.country}
        stat={rightItem.stat}
        countryCode={rightItem.countryCode}
        showHighScore={true}
        highScore={highScore}
        score={score}
      />
    );
  } else {
    rightItemComponent = (
      <MoreOrLessItemToGuess
        gameType={gameType}
        flagSrc={`${
          window.location.origin
        }/img/flags/${rightItem.countryCode.toLowerCase()}.svg`}
        country={rightItem.country}
        countryCode={rightItem.countryCode}
        showHighScore={true}
        isBiggerCb={isBiggerCb}
        isSmallerCb={isSmallerCb}
        highScore={highScore}
        score={score}
      />
    );
  }

  return (
    <>
      {showEndScreen ? (
        <EndScreen score={score} againCb={endScreenCb} />
      ) : (
        <div className='page-container'>
          <div className='left-container' ref={leftRef}>
            <MoreOrLessItem
              gameType={gameType}
              flagSrc={`${
                window.location.origin
              }/img/flags/${leftItem.countryCode.toLowerCase()}.svg`}
              country={leftItem.country}
              stat={leftItem.stat}
              countryCode={leftItem.countryCode}
              countUp={false}
              highScore={highScore}
              score={score}
            />
          </div>
          <div className='right-container' ref={rightRef}>
            {rightItemComponent}
          </div>
        </div>
      )}
    </>
  );
}
