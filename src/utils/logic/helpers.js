import { LEVELS as LEVEL_STRINGS } from "utils/strings";

//the Fisher-Yates shuffle
export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const assessDigit = (string, num) => {
  return string + "--" + num.toString();
};

export const levels = {
  [LEVEL_STRINGS.BEGINNER]: {
    rows: 8,
    cols: 8,
    ants: 10,
    level: LEVEL_STRINGS.BEGINNER,
  },
  [LEVEL_STRINGS.INTERMEDIATE]: {
    rows: 16,
    cols: 16,
    ants: 40,
    level: LEVEL_STRINGS.INTERMEDIATE,
  },
  [LEVEL_STRINGS.EXPERT]: {
    rows: 24,
    cols: 24,
    ants: 99,
    level: LEVEL_STRINGS.EXPERT,
  },
};

export const capitalizeFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;
