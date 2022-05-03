const getRandomItem = (arr, i) => {
  if (i != null) {
    return arr[i];
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

const storeInLocalStoreAndUpdate = (highScore, gameType, cb) => {
  localStorage.setItem(`highScore-${gameType}`, highScore);
  cb();
};

const getFromLocalStore = (gameType) => {
  const highScore = localStorage.getItem(`highScore-${gameType}`) || {};
  return highScore | 0;
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export { getRandomItem, storeInLocalStoreAndUpdate, getFromLocalStore, sleep };
