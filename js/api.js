const openweathermap_API_KEY = "505a3eec3e074cc74ceda32f6b638955";
const opencagedata_API_KEY = "3a09851fa3194aa0be75ea074a79a69c";

async function fetchWeather(city = "", country = "", lat = "", lon = "") {
	let param = "";
	if (city) {
		param = `q=${city}`;
	} else if (lat && lon) {
		param = `lat=${lat}&lon=${lon}`;
	}

	const url = `https://api.openweathermap.org/data/2.5/weather?${param}&appid=${openweathermap_API_KEY}&units=metric`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("City not found. Please check spelling and try again.");
	}

	return response.json();
}

// function to get country code
async function get_country_code(city) {
	const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${opencagedata_API_KEY}`;

	const response = await fetch(url);
	let myJson = await response.json();
	let country_code = myJson.results[0].components.country_code;
	return country_code;
}
