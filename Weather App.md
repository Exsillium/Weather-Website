# Weather App

This is a simple weather application that allows users to search for weather information by city name or by using their current location. It also includes features for user registration and login, theme toggling, and saving the last search.

## Features

- **Weather Search:**
  - Search for weather information by city name.
  - Search for weather information using current location (geolocation).
  - Provides current temperature, weather description, humidity, and wind speed.
  - Displays a relevant weather icon.
- **Predefined Cities:**
  - Dropdown menu with a list of predefined cities for quick selection.
- **Manual Input:**
  - Text input field for searching any city.
  - Debounced input to reduce API calls.
- **User Authentication:**
  - User registration.
  - User login.
- **Theme Toggle:**
  - Switch between light and dark themes.
- **Last Search:**
  - Remembers the last city or location searched.
- **Error Handling:**
  - Displays an error message if a city is not found or if there's an issue with the API.
- **Responsive Design:**
  - The app is designed to work on different screen sizes.

## Technologies Used

- **HTML:** For structuring the web pages.
- **CSS:** For styling the web pages.
- **JavaScript:** For the application logic and interactivity.
- **OpenWeatherMap API:** For fetching weather data.
- **OpenCageData API:** For getting country codes (although this is commented out in the current code).
- **Local Storage:** For saving user preferences (theme, last search) and user data.
- **Session Storage:** For managing user login sessions.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Open `index.html`:**
    - Open the `index.html` file in your web browser.
3.  **API Keys:**
    - You will need to obtain API keys from OpenWeatherMap and OpenCageData to use the application fully.
    - Replace the placeholder API keys in `js/api.js` with your own keys:
      ```javascript
      const openweathermap_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
      const opencagedata_API_KEY = "YOUR_OPENCAGEDATA_API_KEY";
      ```

## Usage

1.  **Search by City:**
    - Select a city from the dropdown menu.
    - Or, type a city name in the text input field and wait for the search.
2.  **Search by Location:**
    - Click the location button to use your current location.
3.  **Toggle Theme:**
    - Click the theme toggle button to switch between light and dark themes.
4.  **Register:**
    - Go to the `register.html` page and fill in the form.
5.  **Login:**
    - Go to the `login.html` page and fill in the form.

## File Structure

Weather-Website/ ├── index.html # Main page ├── login.html # Login page ├── register.html # Register page ├── app.js # Main application logic ├── js/ │ ├── api.js # API interaction functions │ ├── loginAuth.js # Login authentication logic │ ├── regAuth.js # Registration authentication logic │ ├── storage.js # Local and session storage functions │ └── ui.js # UI manipulation functions ├── css/ │ └── style.css # Stylesheet └── README.md # This file

## Future Improvements

- **More Detailed Weather Information:** Add more weather details like hourly forecasts, UV index, etc.
- **Improved UI/UX:** Enhance the user interface and user experience.
- **Caching:** Implement caching to reduce API calls and improve performance.
- **Error Handling:** Add more robust error handling and user feedback.
- **Testing:** Add unit and integration tests.
- **Country code:** add the country code to the search.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
