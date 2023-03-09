export const isProd = process.env.NODE_ENV && process.env.NODE_ENV === "prod";

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

export const capitalizeFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;
