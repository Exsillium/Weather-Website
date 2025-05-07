
# Weather Website
## Overview

A modern weather website that allows users to search for weather conditions in different cities using the OpenWeatherMap API. This responsive web application provides real-time weather data, including temperature, humidity, wind speed, and atmospheric pressure.

## Features

- **City Search**: Look up weather information for any city worldwide
- **Predefined Cities**: Quick access to weather data for major global cities
- **User Authentication**: Login and registration functionality
- **Search History**: Track your recent searches
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Toggle**: Switch between light and dark themes

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  
- **API**:
  - [OpenWeatherMap API](https://openweathermap.org/api)

- **Storage**:
  - LocalStorage (for user data and theme preferences)

## Installation

1. **Clone the repository**:
   git clone https://github.com/Exsillium/Weather-Website.git

2. **Navigate to the project directory**:
   cd Weather-Website

3. **Open the project**:
   - You can simply open the `index.html` file in your browser.
   - Alternatively, use a local development server like Live Server in VS Code.

## Usage

### 1. User Authentication

- Register a new account or log in with existing credentials
- User data is stored in the browser's local storage

### 2. Search for Weather

- Select a city from the dropdown or enter a city name manually
- Click the search button or press Enter to view weather details
- Use the location button to get weather for your current location

### 3. Weather Display

The weather card shows:
- City name and country
- Current temperature
- Weather description
- Weather icon representing current conditions
- Detailed information:
  - Humidity
  - Wind speed
  - Feels-like temperature
  - Atmospheric pressure

### 4. Recent Searches

- View your search history
- Quickly access previously searched cities

### 5. Theme Toggle

- Switch between light and dark themes using the theme toggle button
- Your preference will be saved for future visits

## Project Structure


Weather-Website/
├── index.html        # Main HTML file
├── login.html        # Login page
├── register.html     # Registration page
├── app.js            # Main JavaScript file
├── styles.css        # Main CSS styles
├── js/               # JavaScript modules
└── registration.css  # Styles for authentication pages


## API Usage

This project uses the OpenWeatherMap API to fetch weather data. The application makes API calls to retrieve current weather conditions for the specified city.

Example API endpoint:

https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}


## Future Enhancements

- Weather forecast for upcoming days
- Weather maps and radar
- Additional weather metrics
- Weather alerts and notifications
- Server-side user authentication
- Geolocation-based automatic weather updates

## Contributors

- [Exsillium](https://github.com/Exsillium)
- [Belal33](https://github.com/Belal33)
- [AhmedElgmaizy19](https://github.com/AhmedElgmaizy19)
- [blaack007](https://github.com/blaack007)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- [Font Awesome](https://fontawesome.com/) for the icons
- [Google Fonts](https://fonts.google.com/) for the typography
- [CloudFlare](https://www.cloudflare.com/) for CDN services

