'use strict'

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

const isLoginValid = (login) => {
  if (login.length < 4 || login.length > 16) {
    return false;
  }
  return true;
};

const isLoginUnique = (allLogins, login) => {
  if (allLogins.includes(login)) {
    return false;
  }
  return true;
};

const addLogin = (allLogins, login) => {
 if (!isLoginValid(login)){
   return `Login '${login}' is already existed!`;
 }
 if (!isLoginUnique(allLogins, login)) {
   return 'Login must be more than 4 and less than 16 symbols!';
 }
 return `Success! Your login is ${login}.`;
};

// Вызовы функции для проверки
console.log(addLogin(logins,'Ajax')); // 'Логин успешно добавлен!'
console.log(addLogin(logins,'robotGoogles')); // 'Такой логин уже используется!'
console.log(addLogin(logins,'Zod')); // 'Ошибка! Логин должен быть от 4 до 16 символов'
console.log(addLogin(logins,'jqueryisextremelyfast')); // 'Ошибка! Логин должен быть от 4 до 16 символов'
