"use strict";

const access = prompt("Введите логин", "");
const adminLogin = "admin";
const adminPassword = "m4ngo1zh4ackz0r";
const validInput = "Добро пожаловать!";
const invalidInput = "Доступ запрещён!";
const cancel = "Отменено пользователем!";

if (access === adminLogin) {
  const pass = prompt("Введите пароль", "");

  if (pass === adminPassword) {
    alert(validInput);
  } else if (pass === null) {
    alert(cancel);
  } else {
    alert(invalidInput);
  }
} else if (access === null) {
  alert(cancel);
} else {
  alert(invalidInput);
}
