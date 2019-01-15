"use strict";
const getAllUsersBtn = document.querySelector(".get-users__btn");
const userTable = document.querySelector(".user-table");
const usersResult = document.querySelector(".users-result-table");
const allUsersRespondResult = document.querySelector(".respond-result");

const idSearchInput = document.querySelector("input");
const idSearchForm = document.querySelector(".id-search-form");
const idSearchResult = document.querySelector(".id-search-result");
const allUsersList = userTable.children;

const addUserForm = document.querySelector(".add-user__form");
const inputName = document.querySelector('input[name="name"]');
const inputAge = document.querySelector('input[name="age"]');
const addUserResult = document.querySelector(".add-user__result");

const removeUserForm = document.querySelector(".remove-user__form");
const removeIdInput = removeUserForm.querySelector("input");
const removeUserResult = document.querySelector(".remove-user__result");

const updateUserForm = document.querySelector(".update-user__form");
const updateIdInput = updateUserForm.querySelector('input[name="id"]');
const updateNameInput = updateUserForm.querySelector('input[name="name"]');
const updateAgeInput = updateUserForm.querySelector('input[name="age"]');
const updateUserResult = document.querySelector(".update-user__result");

const allResults = Array.from(document.querySelectorAll(".result"));

const USER_IS_UNDEFINED = `<p class="invalid-form"> User with this id not found! 
</p>`;
const IVALID_INPUT = `<p class="invalid-form">INVALID INPUT!<br>Name can match only a characters.<br>Age can match only a numbers.</p>`;
const EMPTY_INPUT = `<p class="invalid-form"> Please, enter users's id!
</p>`;
const EMPTY_DATABASE = `<p class="invalid-form"> At the moment database is empty.
</p>`;

const API_USERS = "https://test-users-api.herokuapp.com/users/";

const fetchAPI = (
  id = "",
  _method,
  _body = {},
  _headers = {},
  resultBlock,
  showFunc = showResult
) => {
  return fetch(API_USERS + id, {
    method: _method,
    body: _body,
    headers: _headers
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then(user => {
      if (user.data === undefined) {
        clearOtherResults();
        return (resultBlock.innerHTML = USER_IS_UNDEFINED);
      }
      showFunc(user.data, resultBlock);
    })
    .catch(err => console.log(err));
};

// =======================   GET ALL USERS    ================================
getAllUsersBtn.addEventListener("click", handleUserInfo);

function handleUserInfo(evt) {
  evt.preventDefault();
  fetchAPI("", "GET", null, {}, usersResult, showAllUsersTable);
  getAllUsersBtn.removeEventListener("click", handleUserInfo);
}

// =======================   GET USER BY ID    ================================
idSearchForm.addEventListener("submit", handleUser);

function handleUser(evt) {
  evt.preventDefault();
  if (idSearchInput.value === "") {
    idSearchForm.classList.add("invalid-form");
    return (idSearchResult.innerHTML = EMPTY_INPUT);
  }
  fetchAPI(idSearchInput.value, "GET", null, {}, idSearchResult);
  this.reset();
}

// =======================   ADD NEW USER    ================================
addUserForm.addEventListener("submit", handleAddUser);

function handleAddUser(evt) {
  evt.preventDefault();
  if (/[0-9]/.test(inputName.value) || Number.isNaN(inputAge.value)) {
    clearOtherResults();
    this.reset();
    return (addUserResult.innerHTML = IVALID_INPUT);
  }
  fetchAPI(
    "",
    "POST",
    JSON.stringify({ name: `${inputName.value}`, age: `${inputAge.value}` }),
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    addUserResult
  );
  this.reset();
}

// =======================   REMOVE USER BY ID   ==============================
removeUserForm.addEventListener("submit", hadleRemoveUser);

function hadleRemoveUser(evt) {
  evt.preventDefault();
  fetchAPI(removeIdInput.value, "DELETE", null, {}, removeUserResult);
  this.reset();
}

// ====================== UPDATE USER BY ID ====================================
updateUserForm.addEventListener("submit", handleUpdateUser);

function handleUpdateUser(evt) {
  evt.preventDefault();
  if (/[0-9]/.test(inputName.value) || Number.isNaN(inputAge.value)) {
    clearOtherResults();
    this.reset();
    return (addUserResult.innerHTML = IVALID_INPUT);
  }
  const userToUpdate = {
    name: updateNameInput.value,
    age: Number(updateAgeInput.value)
  };
  fetchAPI(
    updateIdInput.value,
    "PUT",
    JSON.stringify(userToUpdate),
    { Accept: "application/json", "Content-Type": "application/json" },
    updateUserResult
  );
  this.reset();
}
// ==========================================================================
function clearOtherResults() {
  allResults.forEach(result => (result.innerHTML = ""));
}

function showResult(user, resultBlock) {
  clearOtherResults();
  idSearchForm.classList.remove("invalid-form");
  getAllUsersBtn.addEventListener("click", handleUserInfo);
  // на DELETE и POST запросы разный синтаксис "id" значения в БД;
  // сделал проверку
  if (user.id === undefined) {
    return (resultBlock.innerHTML = `<p>
    User name:${user.name}<br>
    User age:${user.age}<br>
    User id:${user._id}</p>`);
  }
  resultBlock.innerHTML = `<p>
    User name:${user.name}<br>
    User age:${user.age}<br>
    User id:${user.id}</p>`;
}
function showAllUsersTable(users, resultBlock) {
  clearOtherResults();
  if (users.length === 0) {
    allUsersRespondResult.innerHTML = EMPTY_DATABASE;
  }
  resultBlock.innerHTML = users.reduce(
    (acc, user) =>
      acc +
      `<tr>
 <td>${user.name}</td>
 <td>${user.age}</td>
 <td>${user.id}</td>
</tr>
`,
    ""
  );
}
