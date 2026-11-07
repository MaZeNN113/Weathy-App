import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
const today = dayjs();

const searchInput = document.getElementById('search-box');

searchInput.addEventListener('keydown', (event) => {
  const cityName = searchInput.value.trim();

  if (event.key === 'Enter') {
    if (cityName) {
      console.log(cityName);
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=249085e15af34328ad0161221260511&q=${cityName}&days=7&aqi=no&alerts=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const html = `
          <div class="weather-details">
        <div class="main-weather">
          <div class="weather-text">
            <div class="city">${data.location.name}</div>

            <div class="rain-chance">Chance of rain: ${data.current.chance_of_rain}%</div>

            <div class="city-temp">${Math.round(data.current.temp_c)}°</div>
          </div>

          <div class="weather-emoji-container">
            <img src="images/weather_icons_${getWeatherImage(data.current.condition.code)}.png" class="weather-image"/>
          </div>
        </div>

        <div class="day-forecast">
          <div class="title">Today's Forecast</div>

          <div class="days-forecast-container">
            <div class="forecast-card">
              <p class="hour">6:00 AM</p>

              <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[0].hour[6].condition.code)}.png" class="weather-image-forecast" />

              <div class="temp am6-temp">${data.forecast.forecastday[0].hour[6].temp_c}°</div>
            </div>

            <div class="forecast-card">
              <p class="hour">9:00 AM</p>

              <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[0].hour[9].condition.code)}.png" class="weather-image-forecast" />

              <div class="temp am9-temp">${data.forecast.forecastday[0].hour[9].temp_c}°</div>
            </div>

            <div class="forecast-card">
              <p class="hour">12:00 PM</p>

              <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[0].hour[12].condition.code)}.png" class="weather-image-forecast" />

              <div class="temp pm12-temp">${data.forecast.forecastday[0].hour[12].temp_c}°</div>
            </div>

            <div class="forecast-card">
              <p class="hour">3:00 PM</p>

              <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[0].hour[15].condition.code)}.png" class="weather-image-forecast" />

              <div class="temp pm3-temp">${data.forecast.forecastday[0].hour[15].temp_c}°</div>
            </div>

            <div class="forecast-card">
              <p class="hour">6:00 PM</p>

              <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[0].hour[18].condition.code)}.png" class="weather-image-forecast" />

              <div class="temp pm6-temp">${data.forecast.forecastday[0].hour[18].temp_c}°</div>
            </div>

            <div class="forecast-card">
              <p class="hour">9:00 PM</p>

              <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[0].hour[21].condition.code)}.png" class="weather-image-forecast" />

              <div class="temp pm9-temp">${data.forecast.forecastday[0].hour[21].temp_c}°</div>
            </div>
          </div>
        </div>

        <div class="more-details">
          <div class="air-conditions-title">AIR CONDITIONS</div>

          <div class="first-row-container">
            <div class="real-feel">
              <div class="temp-info">
                <i class="fa-solid fa-temperature-half temp-icon"></i>

                <div class="real-feel-info">
                  <div class="real-feel-title">Real Feel</div>

                  <div class="real-feel-content">${Math.round(data.current.feelslike_c)}°</div>
                </div>
              </div>
            </div>

            <div class="wind">
              <div class="wind-info">
                <i class="fa-solid fa-wind wind-icon"></i>

                <div class="wind-info-container">
                  <div class="wind-title">Wind</div>

                  <div class="wind-content">${data.current.wind_kph} km/h</div>
                </div>
              </div>
            </div>
          </div>

          <div class="second-row-container">
            <div class="chance-of-rain">
              <div class="chance-of-rain-info">
                <i class="fa-solid fa-droplet chance-of-rain-icon"></i>

                <div class="chance-of-rain-container">
                  <div class="chance-of-rain-title">Chance of rain</div>

                  <div class="chance-of-rain-content">${data.current.chance_of_rain}%</div>
                </div>
              </div>
            </div>

            <div class="uv-index-rain">
              <div class="uv-index-info">
                <i class="fa-solid fa-sun uv-index-icon"></i>

                <div class="uv-index-info-container">
                  <div class="uv-index-title">UV Index</div>

                  <div class="uv-index-content">${data.current.uv}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="week-forecast">
        <p class="week-forecast-title">7-DAY FORCAST</p>

        <div class="week-forecast-card">
          <p class="week-day-title first-day">Today</p>

          <div class="icon-description-container">
            <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[0].day.condition.code)}.png" class="weather-image-forecast" />

            <div class="temp-description day-one-description">${data.forecast.forecastday[0].day.condition.text}</div>
          </div>

          <div class="degrees day-one-degrees"><b>${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}</b>/${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°</div>
        </div>

        <div class="week-forecast-card">
          <p class="week-day-title second-day">${today
            .add(1, 'day')
            .format('ddd')}</p>

          <div class="icon-description-container">
            <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[1].day.condition.code)}.png" class="weather-image-forecast" />

            <div class="temp-description day-two-description">${data.forecast.forecastday[1].day.condition.text}</div>
          </div>

          <div class="degrees day-two-degrees"><b>${Math.round(data.forecast.forecastday[1].day.maxtemp_c)}</b>/${Math.round(data.forecast.forecastday[1].day.mintemp_c)}°</div>
        </div>

        <div class="week-forecast-card">
          <p class="week-day-title third-day">${today
            .add(2, 'day')
            .format('ddd')}</p>

          <div class="icon-description-container">
            <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[2].day.condition.code)}.png" class="weather-image-forecast" />

            <div class="temp-description day-three-description">${data.forecast.forecastday[2].day.condition.text}</div>
          </div>

          <div class="degrees day-three-degrees"><b>${Math.round(data.forecast.forecastday[2].day.maxtemp_c)}</b>/${Math.round(data.forecast.forecastday[2].day.mintemp_c)}°</div>
        </div>

        <div class="week-forecast-card">
          <p class="week-day-title fourth-day">${today
            .add(3, 'day')
            .format('ddd')}</p>

          <div class="icon-description-container">
            <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[3].day.condition.code)}.png" class="weather-image-forecast" />

            <div class="temp-description day-four-description">${data.forecast.forecastday[3].day.condition.text}</div>
          </div>

          <div class="degrees day-four-degrees"><b>${Math.round(data.forecast.forecastday[3].day.maxtemp_c)}</b>/${Math.round(data.forecast.forecastday[3].day.mintemp_c)}°</div>
        </div>

        <div class="week-forecast-card">
          <p class="week-day-title fifth-day">${today
            .add(4, 'day')
            .format('ddd')}</p>

          <div class="icon-description-container">
            <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[4].day.condition.code)}.png" class="weather-image-forecast" />

            <div class="temp-description day-five-description">${data.forecast.forecastday[4].day.condition.text}</div>
          </div>

          <div class="degrees day-five-degrees"><b>${Math.round(data.forecast.forecastday[4].day.maxtemp_c)}</b>/${Math.round(data.forecast.forecastday[4].day.mintemp_c)}°</div>
        </div>

        <div class="week-forecast-card">
          <p class="week-day-title sixth-day">${today
            .add(5, 'day')
            .format('ddd')}</p>

          <div class="icon-description-container">
            <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[5].day.condition.code)}.png" class="weather-image-forecast" />

            <div class="temp-description day-six-description">${data.forecast.forecastday[5].day.condition.text}</div>
          </div>

          <div class="degrees day-six-degrees"><b>${Math.round(data.forecast.forecastday[5].day.maxtemp_c)}</b>/${Math.round(data.forecast.forecastday[5].day.mintemp_c)}°</div>
        </div>

        <div class="week-forecast-card">
          <p class="week-day-title seventh-day">${today
            .add(6, 'day')
            .format('ddd')}</p>

          <div class="icon-description-container">
            <img src="images/weather_icons_${getWeatherImage(data.forecast.forecastday[6].day.condition.code)}.png" class="weather-image-forecast" />

            <div class="temp-description day-seven-description">${data.forecast.forecastday[6].day.condition.text}</div>
          </div>

          <div class="degrees day-seven-degrees"><b>${Math.round(data.forecast.forecastday[6].day.maxtemp_c)}</b>/${Math.round(data.forecast.forecastday[6].day.mintemp_c)}°</div>
        </div>
          </div>
          `;

          document.querySelector('main').innerHTML = html;
        })
        .catch((error) => console.error(error));
    } else {
      const existingMessage = document.querySelector('.error-message-display');
      if (existingMessage) {
        existingMessage.remove();
      }

      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Please add a valid country or city';
      errorMessage.classList.add('error-message-display');

      document.querySelector('main').appendChild(errorMessage);

      return;
    }
  }
});

function getWeatherImage(code) {
  if (code === 1000) {
    return 'clear';
  } else if (code === 1003) {
    return 'partly_cloudy';
  } else if (code === 1006 || code === 1009) {
    return 'cloudy';
  } else if (code === 1012) {
    return 'haze';
  } else if (
    code === 1276 ||
    code === 1273 ||
    code === 1243 ||
    code === 1240 ||
    code === 1201 ||
    code === 1198 ||
    code === 1095 ||
    code === 1192 ||
    code === 1189 ||
    code === 1186 ||
    code === 1183 ||
    code === 1180 ||
    code === 1063
  ) {
    return 'rain';
  } else if (code === 1135 || code === 1147) {
    return 'fog';
  } else if (code === 1087) {
    return 'thunderstorm';
  } else if (
    code === 1066 ||
    code === 1282 ||
    code === 1258 ||
    code === 1225 ||
    code === 1222 ||
    code === 1219 ||
    code === 1216 ||
    code === 1213 ||
    code === 1210 ||
    code === 1114
  ) {
    return 'snow';
  } else {
    return 'sunrise';
  }
}

{
  /* <img src="images/weather_icons_clear_night.png" class=""> */
}
