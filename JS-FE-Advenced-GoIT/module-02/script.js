"use strict";

let userInput;
const numbers = [];
let total = 0;
let INVALID_INPUT = "Это не число!";

do {
  userInput = prompt("Введите число", "");

  if (userInput === null) {
    break;
  } else if (!Number.isNaN(+userInput)) {
    numbers.push(+userInput);
  } else {
    alert(INVALID_INPUT);
  }
} while (userInput);

if (numbers.length > 0) {
  for (let item of numbers) {
    total += item;
  }
  alert(`Общая сумма чисел ${total}`);
}
