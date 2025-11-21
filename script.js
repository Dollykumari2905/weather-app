const apiKey = "YOUR_API_KEY_HERE"; 

const weatherDiv = document.getElementById("weather");
const cityInput = document.getElementById("city");
const getWeatherBtn = document.getElementById("getWeather");
const getLocationBtn = document.getElementById("getLocation");

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      weatherDiv.innerHTML = `<p>❌ City not found!</p>`;
      return;
    }

    displayWeather(data);
  } catch (error) {
    weatherDiv.innerHTML = `<p>⚠️ Error fetching data.</p>`;
  }
}

function fetchWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      displayWeather(data);
    });
  } else {
    weatherDiv.innerHTML = `<p>Geolocation not supported.</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;

  weatherDiv.innerHTML = `
    <h2>${name}</h2>
    <p class="temp">${main.temp}°C</p>
    <p class="desc">${weather[0].description}</p>
    <div class="info">
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>🌬️ Wind Speed: ${wind.speed} m/s</p>
    </div>
  `;
}

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherDiv.innerHTML = `<p>⚠️ Please enter a city name.</p>`;
  }
});

getLocationBtn.addEventListener("click", fetchWeatherByLocation);
