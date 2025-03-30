// https://api.openweathermap.org/data/2.5/weather?q=Riyadh,sa&appid=505a3eec3e074cc74ceda32f6b638955&units=metric

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
(function initApp() {
	console.log("initApp");
	// Setup dropdown
	createDropdown(predefinedCities);

	// Set initial theme
	const savedTheme = getTheme();
	if (savedTheme) document.body.classList.add(savedTheme);

	// Check for last search
	const lastSearch = getLastSearch();
	if (lastSearch) {
		handleWeatherSearch(lastSearch.city, lastSearch.country);
	} else {
		showGreeting();
	}

	setupEventListeners();
})();

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
			const [city, country] = e.target.value.split(",").map((s) => s.trim());
			if (city) handleWeatherSearch(city, country);
		}, 3000);
	});

	// Theme toggle
	document.getElementById("theme-toggle").addEventListener("click", () => {
		const newTheme = toggleThemeUI();
		saveTheme(newTheme);
	});
}

async function handleWeatherSearch(city, country = "") {
	try {
		const data = await fetchWeather(city, country);
		showWeather(data);
		updateBackground(data.weather[0].main);
		saveLastSearch(city, country);
	} catch (error) {
		showError(error.message);
	}
}

// storage functions
