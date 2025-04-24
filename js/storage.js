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
async function setUserLocation({ lon, lat }) {
	let users = await getUsers();
	users.forEach((user) => {
		if (user.email === localStorage.getItem("loggedInUser")) {
			user.location = { lon, lat };
		}
	});
	await updateUsers(users);
}

async function getUserLocation() {
	const user = await getTheLogedInUserData();
	return user.location;
}

//  last Search

async function saveLastSearch(city = "", lat = "", lon = "") {
	let users = await getUsers();
	users.forEach((user) => {
		if (user.email === localStorage.getItem("loggedInUser")) {
			user.lastSearch = { city, lat, lon };
		}
	});
	await updateUsers(users);
	// localStorage.setItem("lastSearch", JSON.stringify({ city, lat, lon }));
}
async function getLastSearch() {
	const user = await getTheLogedInUserData();
	return user.lastSearch;
}

// theme
async function getTheme() {
	const user = await getTheLogedInUserData();
	return user.theme;
}

async function saveTheme(theme) {
	let users = await getUsers();
	users.forEach((user) => {
		if (user.email === localStorage.getItem("loggedInUser")) {
			user.theme = theme;
		}
	});
	await updateUsers(users);
	// localStorage.setItem("theme", theme);
}

//  user login and registration

async function getTheLogedInUserData() {
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
	let users = await getUsers();
	return users.find((user) => user.email === userEmail);
}

//Checks if email is already used
async function isAlreadyRegistered(email) {
	let users = await getUsers();
	return users.some((user) => user.email === email);
}

//Gets all users data
async function getUsers() {
	let users = localStorage.getItem("users");
	if (users) {
		users = await decryptAES(users);
		return JSON.parse(users);
	}
	return [];
}

async function updateUsers(users) {
	users = JSON.stringify(users);
	users = await encryptAES(users);
	localStorage.setItem("users", users);
}

//Adds user to localStorage
async function addUser(email, password, location, theme, lastSearch) {
	let users = await getUsers();
	console.log(users);
	let pass = await hashPassword(password);
	users.push({
		email,
		password: pass.hash,
		location,
		theme,
		lastSearch,
		results: location.name ? [location.name] : [],
	});
	await updateUsers(users);
}

async function addResult(cityName) {
	let users = await getUsers();
	users.forEach((user) => {
		if (user.email === localStorage.getItem("loggedInUser")) {
			let resSet = new Set(user.results);
			user.results = Array.from(resSet);
			user.results.length > 7 && (user.results = user.results.slice(0, 7));

			!user.results.includes(cityName) &&
				(user.results = [cityName, ...user.results]);
		}
	});
	await updateUsers(users);
}

//Adds logged in user to session storage to confirm he's logged in
async function logIn(email) {
	let users = await getUsers();
	localStorage.setItem("loggedInUser", email);
	const user = users.find((user) => user.email === email);
	if (user) {
		if (user.lastSearch) {
			await setUserLocation(user.lastSearch);
		}
		if (user.location) {
			await setUserLocation(user.location);
		} else {
			await saveAsyncUserLocation();
		}

		if (user.theme) {
			await saveTheme(user.theme);
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

////////////////////////////////
//  encryption and hashing
////////////////////////////////

// --- Helper Functions ---

// Convert a string to an ArrayBuffer
function str2ab(str) {
	const buf = new ArrayBuffer(str.length);
	const bufView = new Uint8Array(buf);
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

// Convert an ArrayBuffer to a string
function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint8Array(buf));
}

// Convert ArrayBuffer to Base64 string
function ab2base64(buf) {
	return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
}
// Convert Base64 string to ArrayBuffer
function base642ab(base64) {
	return str2ab(atob(base64));
}

// Derive a key from a password using PBKDF2
async function getKey(password, salt) {
	const enc = new TextEncoder();
	const keyMaterial = await window.crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveKey"]
	);
	return window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: salt, // Use a unique salt for each password/key derivation
			iterations: 100000, // Number of iterations (higher is slower but more secure)
			hash: "SHA-256",
		},
		keyMaterial,
		{ name: "AES-GCM", length: 256 }, // Key algorithm and length
		true, // Can extract the key? (false is generally safer)
		["encrypt", "decrypt"] // Key usages
	);
}

// --- Crypto Functions ---

async function encryptAES(plaintext, password) {
	password = window.location.host;
	const salt = window.crypto.getRandomValues(new Uint8Array(16)); // Generate a random salt
	const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV (Initialization Vector)
	const key = await getKey(password, salt);
	const encodedPlaintext = new TextEncoder().encode(plaintext);

	const ciphertext = await window.crypto.subtle.encrypt(
		{
			name: "AES-GCM",
			iv: iv,
		},
		key,
		encodedPlaintext
	);

	// Combine salt, IV, and ciphertext for storage/transmission
	const mixed = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
	mixed.set(salt, 0);
	mixed.set(iv, salt.length);
	mixed.set(new Uint8Array(ciphertext), salt.length + iv.length);

	return ab2base64(mixed.buffer); // Return as base64 string
}

async function decryptAES(encryptedBase64, password) {
	const mixed = base642ab(encryptedBase64);
	password = window.location.host;
	// Extract salt, IV, and ciphertext
	const salt = mixed.slice(0, 16);
	const iv = mixed.slice(16, 16 + 12);
	const ciphertext = mixed.slice(16 + 12);

	const key = await getKey(password, salt);

	try {
		const decrypted = await window.crypto.subtle.decrypt(
			{
				name: "AES-GCM",
				iv: iv,
			},
			key,
			ciphertext
		);

		return new TextDecoder().decode(decrypted);
	} catch (e) {
		console.error("Decryption failed:", e);
		throw new Error("Decryption failed. Check the password or data integrity.");
	}
}
