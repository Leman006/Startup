// Сервис получения погоды (можно мокать)
function getWeather() {
  // Мок данных для демо
  // В реальности здесь был бы запрос к OpenWeather API

  const now = new Date();
  const hour = now.getHours();

  // Простая логика: утро = прохладно, день = тепло, вечер = жарко
  let temperature = 20;
  if (hour >= 6 && hour < 12) {
    temperature = 18 + Math.random() * 4; // 18-22 утром
  } else if (hour >= 12 && hour < 18) {
    temperature = 25 + Math.random() * 8; // 25-33 днем
  } else {
    temperature = 15 + Math.random() * 5; // 15-20 вечером/ночью
  }

  // Случайные осадки (10% вероятность дождя)
  const hasRain = Math.random() < 0.1;
  const precipitation = hasRain ? (Math.random() * 10).toFixed(1) : 0;

  return {
    temperature: Math.round(temperature),
    precipitation: parseFloat(precipitation),
    condition: hasRain ? "rain" : "clear",
  };
}

module.exports = { getWeather };

