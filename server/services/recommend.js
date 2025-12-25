const { getAllLogs, getLastLog } = require("../storage/data");
const { getWeather } = require("./weather");

function getRecommendation() {
  const logs = getAllLogs();
  const lastLog = getLastLog();
  const weather = getWeather();

  // Если нет записей полива
  if (logs.length === 0) {
    return {
      message: "Начните вести журнал полива для получения рекомендаций",
      status: "info",
    };
  }

  // Проверка на дождь
  if (weather.condition === "rain" || weather.precipitation > 5) {
    return {
      message: "Ожидается дождь. Полив можно пропустить.",
      status: "skip",
    };
  }

  // Проверка на жару
  if (weather.temperature > 30) {
    return {
      message: `Жаркая погода (${weather.temperature}°C). Увеличьте полив на 20%.`,
      status: "increase",
    };
  }

  // Проверка на перелив (если последний полив был слишком большим)
  if (lastLog) {
    const avgWater =
      logs.reduce((sum, log) => sum + log.water, 0) / logs.length;
    const lastWater = lastLog.water;

    // Если последний полив на 50% больше среднего
    if (lastWater > avgWater * 1.5 && logs.length > 1) {
      return {
        message: `Риск перелива. Последний полив (${lastWater}л) значительно превышает средний (${Math.round(
          avgWater
        )}л).`,
        status: "warning",
      };
    }

    // Проверка на засуху (если последний полив был давно и жарко)
    const lastDate = new Date(lastLog.date);
    const daysSince = Math.floor(
      (new Date() - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (daysSince > 3 && weather.temperature > 25) {
      return {
        message: `Прошло ${daysSince} дней с последнего полива. При высокой температуре рекомендуется полив.`,
        status: "drought",
      };
    }
  }

  // Норма
  return {
    message: "Полив в норме. Продолжайте текущий режим.",
    status: "normal",
  };
}

module.exports = { getRecommendation };

