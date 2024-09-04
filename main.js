let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".date_time");
let w_forecast = document.querySelector(".weather-forecast");
let temperatur = document.querySelector(".weather-temperature");
let w_icon = document.querySelector(".weather-icon");
let w_minTemp = document.querySelector(".weather-min");
let w_maxTemp = document.querySelector(".weather-max");
let w_feelsLike = document.querySelector(".weather-feelslike");
let w_humidity = document.querySelector(".weather-humidity");
let w_wind = document.querySelector(".weather-wind");
let w_pressure = document.querySelector(".weather-pressure");
let city = "Ahmedabad";

let citySearch = document.querySelector(".weather-search");

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = document.querySelector(".city").value;
  city = cityName;
  getWeatherData();
  cityName.value = "";
});

const getCountryName = (countryCode) => {
  return new Intl.DisplayNames([countryCode], { type: "region" }).of(
    countryCode
  );
};

const getDateTime = (timestamp) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const curDate = new Date(timestamp * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e0bad314bc0f563515d3ef6acbfc0c55`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    const { main, name, weather, wind, sys, dt } = data;
    cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;
    // dateTime.innerHTML = new Date(dt * 1000).toLocaleString("en-us",optons);
    dateTime.innerHTML = getDateTime(dt);
    temperatur.innerHTML = `${kelvinToCelsius(main.temp)}&#176`;
    w_minTemp.innerHTML = `Min: ${kelvinToCelsius(main.temp_min)}&#176`;
    w_maxTemp.innerHTML = `Max: ${kelvinToCelsius(main.temp_max)}&#176`;
    w_feelsLike.innerHTML = `${kelvinToCelsius(main.feels_like)}&#176`;
    w_humidity.innerHTML = `${main.humidity} %`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/w/${weather[0].icon}.png" />`;
  } catch (err) {}
};

document.body.addEventListener("load", getWeatherData());
