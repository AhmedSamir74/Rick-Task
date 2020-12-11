export const numberFormatter = (num: number) => {
  if (num > 999 && num <= 999999) {
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K';
  } else if (num > 999999 && num <= 999999999) {
    return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M';
  } else if (num > 999999999 && num <= 999999999999) {
    return Math.sign(num) * (Math.abs(num) / 1000000000).toFixed(1) + 'B';
  } else if (num > 999999999999 && num < 999999999999999) {
    return Math.sign(num) * (Math.abs(num) / 1000000000000).toFixed(1) + 'T';
  } else {
    return Math.sign(num) * Math.abs(num);
  }
};
