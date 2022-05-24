const getRandomItem = (arr, i) => {
  if (i != null) {
    return arr[i];
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

const storeInLocalStoreAndUpdate = (highScore, gameType, cb) => {
  localStorage.setItem(`highScore-${gameType}`, highScore);
  cb();
};

const getFromLocalStore = (gameType) => {
  const highScore = localStorage.getItem(`highScore-${gameType}`) || {};
  return highScore | 0;
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export {
  getRandomItem,
  getRandomNumberBetween,
  shuffleArray,
  storeInLocalStoreAndUpdate,
  getFromLocalStore,
  sleep,
};
