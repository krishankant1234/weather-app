document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city_input");
    const searchBtn = document.getElementById("searchBtn");
    const locationBtn = document.getElementById("locationBtn");
    const api_key = '41b53775cd61a09ee7949c2d8fbb83db';
    const currentWeatherCard = document.querySelector('.weather-left .card');
    const fiveDaysForecastCard = document.querySelector('.day-forecast');
    const aqiCard = document.querySelectorAll('.highlights .card')[0];
    const sunriseCard = document.querySelectorAll('.highlights .card')[1];
    const humidityVal = document.getElementById('humidityVal');
    const pressureVal = document.getElementById('pressureVal');
    const visibilityVal = document.getElementById('visibilityVal');
    const windspeedVal = document.getElementById('windspeedVal');
    const feelsVal = document.getElementById('feelsVal');
    const hourlyForecastCard = document.querySelector('.hourly-forecast');
    const aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

    function getWeatherDetails(name, lat, lon, country, state) {
        const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
        const AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        fetch(AIR_POLLUTION_API_URL)
            .then(res => res.json())
            .then(data => {
                const { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
                const aqi = data.list[0].main.aqi;
                aqiCard.innerHTML = `
                    <div class="card-head">
                        <p>Air Quality Index</p>
                        <p class="air-index aqi-${aqi}">${aqiList[aqi - 1]}</p>
                    </div>
                    <div class="air-indices">
                        <img src="wind2 icon.png" height="40px">
                        <div class="item">
                            <p>PM2.5</p>
                            <h2>${pm2_5}</h2>
                        </div>
                        <div class="item">
                            <p>PM10</p>
                            <h2>${pm10}</h2>
                        </div>
                        <div class="item">
                            <p>SO2</p>
                            <h2>${so2}</h2>
                        </div>
                        <div class="item">
                            <p>CO</p>
                            <h2>${co}</h2>
                        </div>
                        <div class="item">
                            <p>NO</p>
                            <h2>${no}</h2>
                        </div>
                        <div class="item">
                            <p>NO2</p>
                            <h2>${no2}</h2>
                        </div>
                        <div class="item">
                            <p>NH3</p>
                            <h2>${nh3}</h2>
                        </div>
                        <div class="item">
                            <p>O3</p>
                            <h2>${o3}</h2>
                        </div>
                    </div>
                `;
            })
            .catch(() => {
                alert('Failed to fetch Air Quality Index');
            });

        fetch(WEATHER_API_URL)
            .then(res => res.json())
            .then(data => {
                const date = new Date();
                const timezoneOffset = data.timezone / 3600; // Convert seconds to hours
                const sRiseTime = moment.unix(data.sys.sunrise).utcOffset(timezoneOffset).format('h:mm A');
                const sSetTime = moment.unix(data.sys.sunset).utcOffset(timezoneOffset).format('h:mm A');

                currentWeatherCard.innerHTML = `
                    <div class="current-weather">
                        <div class="details">
                            <p>Now</p>
                            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                            <p>${data.weather[0].description}</p>
                        </div>
                        <div class="weather-icon">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" height="25px">
                        </div>
                    </div> <br>
                    <hr>
                    <div class="card-footer">
                        <p><img src="gps (1).png" height="16px">${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</p>
                        <p><img src="calendar.png" height="16px">${name}, ${country}</p>
                    </div>
                `;

                sunriseCard.innerHTML = `
                    <div class="card-head">
                        <p>Sunrise & Sunset</p>
                    </div>
                    <div class="sunrise-sunset">
                        <div class="item">
                            <div class="icon">
                                <img src="sunrise (1).png" height="32px">
                            </div>
                            <div>
                                <p>Sunrise</p>
                                <h2>${sRiseTime}</h2>
                            </div>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <img src="sunset.png" height="32px">
                            </div>
                            <div>
                                <p>Sunset</p>
                                <h2>${sSetTime}</h2>
                            </div>
                        </div>
                    </div>
                `;
                humidityVal.innerHTML = `${data.main.humidity}%`;
                pressureVal.innerHTML = `${data.main.pressure} hPa`;
                visibilityVal.innerHTML = `${data.visibility / 1000} km`;
                windspeedVal.innerHTML = `${data.wind.speed} m/s`;
                feelsVal.innerHTML = `${(data.main.feels_like - 273.15).toFixed(2)}&deg;C`;
            })
            .catch(() => {
                alert('Failed to fetch current weather');
            });

        fetch(FORECAST_API_URL)
            .then(res => res.json())
            .then(data => {
                const hourlyForecast = data.list;
                hourlyForecastCard.innerHTML = '';
                for (let i = 0; i <= 7; i++) {
                    const hrForecastDate = new Date(hourlyForecast[i].dt_txt);
                    let hr = hrForecastDate.getHours();
                    let a = 'PM';
                    if (hr < 12) a = 'AM';
                    if (hr === 0) hr = 12;
                    if (hr > 12) hr -= 12;
                    hourlyForecastCard.innerHTML += `
                        <div class="card">
                            <p>${hr} ${a}</p>
                            <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" height="25px">
                            <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                        </div>
                    `;
                }
                const uniqueForecastDays = [];
                const fiveDaysForecast = data.list.filter(forecast => {
                    const forecastDate = new Date(forecast.dt_txt).getDate();
                    if (!uniqueForecastDays.includes(forecastDate)) {
                        uniqueForecastDays.push(forecastDate);
                        return true;
                    }
                    return false;
                });
                fiveDaysForecastCard.innerHTML = '';
                for (let i = 1; i < fiveDaysForecast.length; i++) {
                    const date = new Date(fiveDaysForecast[i].dt_txt);
                    fiveDaysForecastCard.innerHTML += `
                        <div class="forecast-item">
                            <div class="icon-wrapper">
                                <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" height="25px">&nbsp;
                                <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                            </div>
                            <p>${date.getDate()} ${months[date.getMonth()]}</p>
                            <p>${days[date.getDay()]}</p>
                        </div>
                    `;
                }
            })
            .catch(() => {
                alert('Failed to fetch weather forecast');
            });
    }

    function getCityCoordinates() {
        const cityName = cityInput.value.trim();
        cityInput.value = '';
        if (!cityName) return;
        const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
        fetch(GEOCODING_API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    alert('City not found');
                    return;
                }
                const { lat, lon, country, state } = data[0];
                getWeatherDetails(cityName, lat, lon, country, state);
            })
            .catch(() => {
                alert('Failed to fetch city coordinates');
            });
    }

    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const REVERSE_GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
                fetch(REVERSE_GEOCODING_API_URL)
                    .then(res => res.json())
                    .then(data => {
                        if (data.length === 0) {
                            alert('Location not found');
                            return;
                        }
                        const { name, country, state } = data[0];
                        getWeatherDetails(name, latitude, longitude, country, state);
                    })
                    .catch(() => {
                        alert('Failed to fetch location details');
                    });
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    searchBtn.addEventListener('click', getCityCoordinates);
    locationBtn.addEventListener('click', getCurrentLocation);
});
