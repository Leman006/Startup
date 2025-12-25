const { getWeather } = require("../services/weather");

function getWeatherData(req, res) {
  const weather = getWeather();
  res.json(weather);
}

module.exports = {
  getWeatherData,
};

