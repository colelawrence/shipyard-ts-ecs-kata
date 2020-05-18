export const createAntiLoop = (max = 10) => () => {
  if (max < 0) {
    throw new Error("Antiloop protection");
  }
  else {
    max--;
  }
};
