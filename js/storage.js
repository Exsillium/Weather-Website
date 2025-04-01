//  user Location
function saveAsyncUserLocation() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				localStorage.setItem("location", JSON.stringify({ lat, lon }));
				resolve({ lat, lon });
			},
			(error) => {
				reject(error);
			}
		);
	});
}
function setUserLocation({ lon, lat }) {
	let users = getUsers();
	users.forEach((user) => {
		if (user.email === localStorage.getItem("loggedInUser")) {
			user.location = { lon, lat };
		}
	});
	localStorage.setItem("users", JSON.stringify(users));
	// localStorage.setItem("location", JSON.stringify({ lon, lat }));
}

function getUserLocation() {
	const user = getTheLogedInUserData();

	return user.location;
}

//  last Search

function saveLastSearch(city = "", lat = "", lon = "") {
	let users = getUsers();
	users.forEach((user) => {
		if (user.email === localStorage.getItem("loggedInUser")) {
			user.lastSearch = { city, lat, lon };
		}
	});
	localStorage.setItem("users", JSON.stringify(users));
	// localStorage.setItem("lastSearch", JSON.stringify({ city, lat, lon }));
}
function getLastSearch() {
	const user = getTheLogedInUserData();
	return user.lastSearch;
}

// theme
function getTheme() {
	const user = getTheLogedInUserData();
	return user.theme;
}

function saveTheme(theme) {
	let users = getUsers();
	users.forEach((user) => {
		if (user.email === localStorage.getItem("loggedInUser")) {
			user.theme = theme;
		}
	});
	localStorage.setItem("users", JSON.stringify(users));
	// localStorage.setItem("theme", theme);
}

//  user login and registration

function getTheLogedInUserData() {
	/**
	 * return {
	 * 	email:"example@gmail.com",
	 * 	themw:"light",
	 * 	lastSearch: {
	 * 		city:"cairo"
	 * 		lon:44,
	 * 		lat:33,
	 * },
	 * 	location:{
	 * 		lon:34,
	 * 		lat:34,
	 * 	}
	 * }
	 */
	let userEmail = localStorage.getItem("loggedInUser");
	let users = getUsers();
	return users.find((user) => user.email === userEmail);
}

//Checks if email is already used
function isAlreadyRegistered(email) {
	let users = getUsers();
	return users.some((user) => user.email === email);
}

//Gets all users data
function getUsers() {
	let users = localStorage.getItem("users");
	return users ? JSON.parse(users) : [];
}

//Adds user to localStorage
function addUser(email, password, location, theme, lastSearch) {
	let users = getUsers();
	users.push({ email, password, location, theme, lastSearch });
	localStorage.setItem("users", JSON.stringify(users));
}

//Adds logged in user to session storage to confirm he's logged in
async function logIn(email) {
	localStorage.setItem("loggedInUser", email);
	const user = users.find((user) => user.email === email);
	if (user) {
		if (user.location) {
			setUserLocation(user.location);
		} else {
			await saveAsyncUserLocation();
		}
		if (user.lastSearch) {
			setUserLocation(user.lastSearch);
		}
		if (user.theme) {
			saveTheme(user.theme);
		}
	}
	console.log("logged in", user);
}

function logOut() {
	localStorage.removeItem("loggedInUser");
}
function isAlreadyLogedIn() {
	let email = localStorage.getItem("loggedInUser");
	if (email) {
		if (isAlreadyRegistered(email)) {
			return true;
		}
		logOut();
		return false;
	}
	return false;
}
