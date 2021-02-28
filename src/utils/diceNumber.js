const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function diceNumber() {
  return getRandomNumber(1, 6);
}
