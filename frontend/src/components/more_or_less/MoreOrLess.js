import React, { useState } from 'react';
import MoreOrLessItem from './MoreOrLessItem';
import './more-or-less.scss';
import EndScreen from './EndScreen';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function getRandomItem(arr, i) {
  // return arr[i];
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
  const [items, setItems] = useState([
    getRandomItem(data, 0),
    getRandomItem(data, 1),
  ]);

  const [prevRightItem, setPrevRightItem] = useState(items[1]);

  const [showButtonsRight, setShowButtonsRight] = useState(true);

  const [showEndScreen, setShowEndScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getFromLocalStore(gameType));

  const isBiggerCb = () => {
    setShowButtonsRight(false);
    setTimeout(() => {
      if (items[1].stat > items[0].stat) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, gameType, () =>
            setHighScore(highScore + 1)
          );
        }
        setScore(score + 1);
        setPrevRightItem(items[1]);

        // setTimeout(() => {
        setItems((items) => items.filter((item) => item.stat < 0.01));
        // }, 500);
        // setCountUp(false);

        setTimeout(() => {
          setItems((items) => {
            return [prevRightItem, getRandomItem(data, 3)];
          });
        }, 750);
        setShowButtonsRight(true);

        // setItems((prevItems) => {
        //   return [prevItems[1], getRandomItem(data)];
        // });
      } else {
        setShowEndScreen(true);
      }
    }, 2000);
  };

  const isSmallerCb = () => {
    setShowButtonsRight(false);
    setTimeout(() => {
      if (items[1].stat < items[0].stat) {
        if (score + 1 > highScore) {
          storeInLocalStoreAndUpdate(highScore + 1, gameType, () =>
            setHighScore(highScore + 1)
          );
        }
        setScore(score + 1);
        setPrevRightItem(items[1]);

        // setTimeout(() => {
        setItems((items) => items.filter((item) => item.stat < 0.01));
        // }, 500);

        setTimeout(() => {
          setItems((items) => {
            return [prevRightItem, getRandomItem(data, 3)];
          });
        }, 750);
        setShowButtonsRight(true);

        // setItems((prevItems) => {
        //   return [prevItems[1], getRandomItem(data)];
        // });
      } else {
        setShowEndScreen(true);
      }
    }, 2000);
  };

  const endScreenCb = () => {
    setShowEndScreen(false);
    setShowButtonsRight(true);
    setItems([getRandomItem(data), getRandomItem(data)]);
    setScore(0);
  };

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
          <TransitionGroup className='game-container'>
            {items.map((item, idx) => {
              return (
                <CSSTransition key={idx} timeout={500} classNames='item'>
                  <MoreOrLessItem
                    gameType={gameType}
                    flagSrc={`${
                      window.location.origin
                    }/img/flags/${item.countryCode.toLowerCase()}.svg`}
                    country={item.country}
                    stat={item.stat}
                    countryCode={item.countryCode}
                    countUp={idx === 0 ? false : true}
                    // countUp={idx === 0 ? showButtonsLeft : showButtonsRight}
                    guess={idx === 0 ? false : showButtonsRight}
                    isSmallerCb={isSmallerCb}
                    isBiggerCb={isBiggerCb}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      )}
    </>
  );
  // return (
  //   <>
  //     {showEndScreen ? (
  //       <EndScreen score={score} againCb={endScreenCb} />
  //     ) : (
  //       <div className='page-container'>
  //         <div className='score-container'>
  //           <div className='score-item'>
  //             <div className='score-count'>{score}</div>
  //             <div className='score-label'>Score</div>
  //           </div>
  //           <div className='highscore-item'>
  //             <div className='highscore-count'>{highScore}</div>
  //             <div className='highscore-label'>Highscore</div>
  //           </div>
  //         </div>
  //         <TransitionGroup className='game-container'>
  //           {items.map((item) => (
  //             <CSSTransition
  //               key={item.country}
  //               timeout={10000}
  //               classNames='item'
  //               // onEnter={console.log('entering')}
  //               // onExit={console.log('exit')}
  //             >
  //               <div className='item'>
  //                 {item.country}
  //                 <button
  //                   onClick={() =>
  //                     setItems((items) =>
  //                       items.filter((item) => item.country !== 'China')
  //                     )
  //                   }
  //                 >
  //                   {item.stat}
  //                 </button>
  //               </div>
  //             </CSSTransition>
  //           ))}
  //         </TransitionGroup>
  //       </div>
  //     )}
  //   </>
  // );
}
