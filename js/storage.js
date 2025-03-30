// storage.js
function getLastSearch() {
  const search = localStorage.getItem("lastSearch");
  return search ? JSON.parse(search) : null;
}

function saveLastSearch(city, country) {
  localStorage.setItem("lastSearch", JSON.stringify({ city, country }));
}

function getTheme() {
  return localStorage.getItem("theme") || "light";
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

//Checks if email is already used
function alreadyRegistered(email) {
  let users = getUsers();
  return users.some((user) => user.email === email);
}

//Gets all users data
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

//Adds user to localStorage
function addUser(email, password) {
  let users = getUsers();
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
}

//Adds logged in user to session storage to confirm he's logged in
function logIn(email) {
  sessionStorage.setItem("loggedInUser", email);
}

//Check if user is logged in
function loggedIn() {
  if (!sessionStorage.getItem("loggedInUser")) {
    window.location.href = "/login.html";
  }
}
