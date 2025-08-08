const API_KEY = '60b98a1fa4f911edb19284099e57670c'; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const weatherDiv = document.getElementById('weatherResult');

  if (!city) {
    weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherDiv.innerHTML = `
          <h3>${data.name}</h3>
          <img src="${iconUrl}" class="weather-icon" />
          <p><strong>Temperature:</strong> ${temp} °C</p>
          <p><strong>Condition:</strong> ${desc}</p>
        `;
      } else {
        weatherDiv.innerHTML = '<p>City not found. Please try again.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      weatherDiv.innerHTML = '<p>Failed to get weather data.</p>';
    });
}
