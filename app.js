const API_KEY = "cb301aa38e9dbd9559f4f7bf62688659";
const UNITS = "metric";

async function fetchWeatherData(country, city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${UNITS}`;
  // get user email to set last searched country for specific user in localStorage
  // using sessionStorage to save the data of the currently logged in user
  //   const email = sessionStorage.getItem();
  //   if (!email) {
  //     alert("You're not logged in, Please login to proceed");
  //     location.href = "login.html";
  //   }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}
fetchWeatherData("Riyadh", "sa");
