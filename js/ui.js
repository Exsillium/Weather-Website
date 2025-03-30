function createDropdown(cities) {
	const select = document.getElementById("city-select");
	console.log("creating dropdown");
	cities.forEach(({ city, country }) => {
		const option = document.createElement("option");
		option.value = `${city},${country}`;
		option.textContent = city;
		select.appendChild(option);
	});
}

function showWeather(data) {
	const weatherDisplay = document.getElementById("weather-display");
	const greeting = document.getElementById("greeting");

	weatherDisplay.classList.remove("hidden");
	greeting.classList.add("hidden");

	weatherDisplay.querySelector(".city-name").textContent = data.name;
	weatherDisplay.querySelector(".temperature").textContent = `${Math.round(
		data.main.temp
	)}°C`;
	weatherDisplay.querySelector(".description").textContent =
		data.weather[0].description;
	weatherDisplay.querySelector(".humidity").textContent = data.main.humidity;
	weatherDisplay.querySelector(".wind").textContent = data.wind.speed;

	const icon = weatherDisplay.querySelector(".weather-icon");
	icon.textContent = getWeatherIcon(data.weather[0].id);
}

function getWeatherIcon(conditionCode) {
	if (conditionCode >= 200 && conditionCode < 300) return "⛈️";
	if (conditionCode >= 300 && conditionCode < 600) return "🌧️";
	if (conditionCode >= 600 && conditionCode < 700) return "❄️";
	if (conditionCode >= 700 && conditionCode < 800) return "🌫️";
	if (conditionCode === 800) return "☀️";
	if (conditionCode > 800) return "☁️";
	return "🌤️";
}

function updateBackground(weatherCondition) {
	const body = document.body;
	body.className = ""; // Reset classes
	body.classList.add(weatherCondition.toLowerCase());
}

function toggleThemeUI() {
	const currentTheme = document.body.dataset.theme || "light";
	const newTheme = currentTheme === "light" ? "dark" : "light";
	document.body.dataset.theme = newTheme;
	return newTheme;
}

function showError(message) {
	const errorElement = document.getElementById("error");
	errorElement.textContent = message;
	errorElement.classList.remove("hidden");
	setTimeout(() => errorElement.classList.add("hidden"), 5000);
}

function showGreeting() {
	document.getElementById("greeting").classList.remove("hidden");
	document.getElementById("weather-display").classList.add("hidden");
}
