const predefinedCities = [
	{ city: "New York", country: "US" },
	{ city: "Los Angeles", country: "US" },
	{ city: "Chicago", country: "US" },
	{ city: "London", country: "GB" },
	{ city: "Paris", country: "FR" },
	{ city: "Berlin", country: "DE" },
	{ city: "Madrid", country: "ES" },
	{ city: "Rome", country: "IT" },
	{ city: "Amsterdam", country: "NL" },
	{ city: "Moscow", country: "RU" },
	{ city: "Beijing", country: "CN" },
	{ city: "Shanghai", country: "CN" },
	{ city: "Tokyo", country: "JP" },
	{ city: "Seoul", country: "KR" },
	{ city: "Bangkok", country: "TH" },
	{ city: "Jakarta", country: "ID" },
	{ city: "Mumbai", country: "IN" },
	{ city: "New Delhi", country: "IN" },
	{ city: "Dubai", country: "AE" },
	{ city: "Riyadh", country: "SA" },
	{ city: "Istanbul", country: "TR" },
	{ city: "Cairo", country: "EG" },
	{ city: "Johannesburg", country: "ZA" },
	{ city: "Sydney", country: "AU" },
	{ city: "Melbourne", country: "AU" },
	{ city: "São Paulo", country: "BR" },
	{ city: "Buenos Aires", country: "AR" },
	{ city: "Mexico City", country: "MX" },
	{ city: "Toronto", country: "CA" },
	{ city: "Vancouver", country: "CA" },
];

// Initialize App
(async function initApp() {
	console.log("initApp");
	await checkAuthentication();
	const user = await getTheLogedInUserData();
	console.log(user);

	// Setup dropdown
	createDropdown(predefinedCities);
	createRecentResults(user.results);

	// Set initial theme
	const savedTheme = await getTheme();
	if (savedTheme) document.body.dataset.theme = savedTheme;

	// Check for last search
	const lastSearch = await getLastSearch();
	if (lastSearch) {
		if (lastSearch.city) {
			await handleWeatherSearch(lastSearch.city);
		}
		if (lastSearch.lat && lastSearch.lon) {
			await handleWeatherSearch(null, lastSearch.lat, lastSearch.lon);
		}
	} else {
		showGreeting();
	}
})().then(() => {
	setupEventListeners();
});

async function checkAuthentication() {
	const userEmail = localStorage.getItem("loggedInUser");
	const isGitHubPages = window.location.host.includes("github.io");

	console.log(window.location.toString());
	if (!userEmail) {
		isGitHubPages
			? window.location.replace(window.location.toString() + "login.html")
			: window.location.replace("login.html");
		return;
	}
	const registered = await isAlreadyRegistered(userEmail);
	if (!registered) {
		localStorage.removeItem("loggedInUser");
		isGitHubPages
			? window.location.replace(window.location.toString() + "register.html")
			: window.location.replace("register.html");
	}
}

async function handleWeatherSearch(city = "", lat = "", lon = "") {
	try {
		let data;
		//get country code
		if (city) {
			// we don't need the country code anymore
			// let country = await get_country_code(city);
			data = await fetchWeather(city);
			console.log("city:", data);
			await saveLastSearch(data.name, data.coord.lat, data.coord.lon);
			await addResult(data.name);
			let user = await getTheLogedInUserData();
			createRecentResults(user.results);
		} else if (lat && lon) {
			data = await fetchWeather("", "", lat, lon);
			console.log("location:", data);
			await saveLastSearch(data.name || "", lat, lon);
			await addResult(data.name);
			let user = await getTheLogedInUserData();
			createRecentResults(user.results);
		}
		showWeather(data);
		updateBackground(data.weather[0].main);
	} catch (error) {
		showError(error.message);
	}
}

function setupEventListeners() {
	// Dropdown change
	document.getElementById("city-select").addEventListener("change", (e) => {
		const [city, country] = e.target.value.split(",");
		if (city) handleWeatherSearch(city, country);
	});

	// Manual input with debounce
	let timeout;
	document.getElementById("manual-input").addEventListener("input", (e) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			const city = e.target.value;
			if (city) handleWeatherSearch(city);
		}, 500);
	});

	// Theme toggle
	document
		.getElementById("theme-toggle")
		.addEventListener("click", async () => {
			const newTheme = toggleThemeUI();
			await saveTheme(newTheme);
		});
	document.getElementById("logout-button").addEventListener("click", () => {
		logOut();
		window.location.replace("login.html");
	});

	document.getElementById("location-button").addEventListener("click", () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			handleWeatherSearch("", lat, lon);
		});
	});
}
