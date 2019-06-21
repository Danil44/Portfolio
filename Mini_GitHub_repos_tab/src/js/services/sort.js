export const sortNumbers = (array, num) =>
  array.sort((a, b) => a[num] - b[num]);

export const sortStrings = (array, str) =>
  array.sort((a, b) => (a[str].toUpperCase() > b[str].toUpperCase() ? 1 : -1));
