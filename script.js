const apiKey = 'befd984de4d3c050671d4eb935e6c660';


const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');
const error = document.getElementById('error');
const loading = document.getElementById('loading');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const darkModeToggle = document.getElementById('darkModeToggle');

// Fetch weather data
async function fetchWeather(city) {
  try {
    loading.style.display = 'block';
    error.style.display = 'none';
    weatherInfo.style.display = 'none';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      throw new Error('City not found or invalid API response');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error);
  } finally {
    loading.style.display = 'none';
  }
}

// Display weather data
function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weather.textContent = `Weather: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  weatherInfo.style.display = 'block';
}

// error
function showError(error) {
  error.style.display = 'block';
  weatherInfo.style.display = 'none';
}

// Event listener
getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// Toggle for Dark Mode
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);
});
