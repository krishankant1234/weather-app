WeatherNow - Your Instant Weather Companion
WeatherNow is a sleek and intuitive web application that provides real-time weather information, 5-day forecasts, and crucial atmospheric highlights for any city you search, or for your current location. Built with HTML, CSS, and JavaScript, it offers a clean user interface and responsive design for seamless experience across devices.

Features
Current Weather: Get instant details on temperature, weather description, and location.
5-Day Forecast: Plan your week with a clear forecast for the next five days, including daily temperature and weather conditions.
Hourly Forecast: See temperature and weather conditions for the upcoming hours.
Today's Highlights: Dive deeper with comprehensive data on:
Air Quality Index (AQI): Understand the air quality with detailed breakdowns of PM2.5, PM10, SO2, CO, NO, NO2, NH3, and O3 levels, categorized with clear labels (Good, Fair, Moderate, Poor, Very Poor).
Sunrise & Sunset Times: Know exactly when the sun rises and sets for the day.
Humidity: Check the current humidity percentage.
Pressure: See the atmospheric pressure.
Visibility: Get information on visibility in kilometers.
Wind Speed: Track the current wind speed.
Feels Like Temperature: Understand the perceived temperature, accounting for humidity and wind.
City Search: Easily find weather information for any city worldwide by typing its name.
Current Location Weather: Grant location permission to instantly fetch weather data for your precise location.
Responsive Design: Enjoy an optimized viewing experience on desktops, tablets, and mobile phones.
How to Use
Clone the Repository:

Bash

git clone <repository_url>
Open index.html:
Navigate to the project directory and open the index.html file in your web browser.

Search for a City:

Enter the name of a city in the "Enter city name" input field.
Click the "Search" button.
Get Current Location Weather:

Click the "Current Location" button.
If prompted, allow your browser to access your location.
Technologies Used
HTML5: For the basic structure and content of the web page.
CSS3: For styling the application, including a responsive layout and appealing visual elements.
JavaScript: For fetching weather data from the OpenWeatherMap API, processing it, and dynamically updating the UI.
OpenWeatherMap API: Used to retrieve current weather, 5-day/3-hour forecast, and air pollution data.
Moment.js: A lightweight JavaScript date library used for parsing, validating, manipulating, and formatting dates (specifically for sunrise/sunset times and forecast dates).
API Key
The application uses the OpenWeatherMap API. You will need a valid API key to fetch weather data.
The provided JavaScript code contains the placeholder:
const api_key = '41b53775cd61a09ee7949c2d8fbb83db';

Note: For production environments, it is recommended to manage API keys securely and not directly embed them in client-side code.

File Structure
├── index.html
├── style.css
├── script.js
├── search icon.png
├── current location icon.png
├── cloud-solid.svg
├── cloudy (1).png
├── gps (1).png
├── calendar.png
├── wind2 icon.png
├── sunrise (1).png
├── sunset.png
├── humidity.png
├── compass.png
├── view.png
├── windspeed arrow.png
└── thermometer.png
