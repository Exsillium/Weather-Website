// storage.js
function getLastSearch() {
	const search = localStorage.getItem("lastSearch");
	return search ? JSON.parse(search) : null;
}

function saveLastSearch(city = '', lat ='', lon = '') {
	localStorage.setItem("lastSearch", JSON.stringify({ city, lat, lon }));
}

function getTheme() {
	return localStorage.getItem("theme") || "light";
}

function saveTheme(theme) {
	localStorage.setItem("theme", theme);
}
