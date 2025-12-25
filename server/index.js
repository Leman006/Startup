const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * calculateWaterNeed(farmData, weatherData)
 * - farmData: { cropType, soilType, area (м²), lastIrrigationDate }
 * - weatherData: { temp (°C), humidity (0-100), precip (mm) }
 * Returns: { waterAmount (liters), status, reason, netIrr_mm }
 */
function calculateWaterNeed(farmData, weatherData) {
  const {
    cropType = "",
    soilType = "",
    area = 100,
    lastIrrigationDate = null,
  } = farmData || {};
  const { temp = 20, humidity = 50, precip = 0 } = weatherData || {};

  const kcMap = {
    apples: 0.7,
    apple: 0.7,
    vegetables: 1.0,
    vegetable: 1.0,
    wheat: 0.6,
    corn: 0.9,
    pasture: 1.2,
    cactus: 0.2,
    default: 0.85,
  };

  const soilFactorMap = {
    sandy: 1.15,
    sand: 1.15,
    loam: 1.0,
    clay: 0.9,
    silt: 0.95,
    default: 1.0,
  };

  const keyCrop = String(cropType || "").toLowerCase();
  const keySoil = String(soilType || "").toLowerCase();

  const Kc = kcMap[keyCrop] ?? kcMap.default;
  const soilFactor = soilFactorMap[keySoil] ?? soilFactorMap.default;

  // Упрощённая оценка ET0 (мм/день)
  let ET0 = 0.1 * Number(temp) + 0.05 * (100 - Number(humidity));
  ET0 = Math.max(1, Math.min(8, ET0));

  let ETc = ET0 * Kc * soilFactor;

  // Коррекция по недавнему поливу
  let recentFactor = 1.0;
  if (lastIrrigationDate) {
    const last = new Date(lastIrrigationDate);
    if (!isNaN(last.getTime())) {
      const days = (Date.now() - last.getTime()) / (1000 * 60 * 60 * 24);
      if (days < 1) recentFactor = 0.7;
      else if (days < 3) recentFactor = 0.85;
    }
  }
  ETc = ETc * recentFactor;

  const netIrr_mm = Math.max(0, ETc - Math.max(0, Number(precip)));

  const area_m2 = Math.max(0, Number(area) || 0);
  const waterLiters = Math.round(netIrr_mm * area_m2);

  const status =
    waterLiters === 0 ? "No irrigation needed" : "Irrigation recommended";
  const reason = `ET0=${ET0.toFixed(
    2
  )} mm, Kc=${Kc}, soilFactor=${soilFactor}, recentFactor=${recentFactor}, precip=${Number(
    precip
  )} mm, netIrr=${netIrr_mm.toFixed(2)} mm, area=${area_m2} m²`;

  return {
    waterAmount: waterLiters,
    status,
    reason,
    netIrr_mm,
  };
}

app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    // Get weather data from Open-Meteo API
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`
    );

    const current = weatherResponse.data.current;

    // Weather code to description mapping
    const weatherCodes = {
      0: "clear sky",
      1: "mainly clear",
      2: "partly cloudy",
      3: "overcast",
      45: "foggy",
      48: "depositing rime fog",
      51: "light drizzle",
      53: "moderate drizzle",
      55: "dense drizzle",
      56: "light freezing drizzle",
      57: "dense freezing drizzle",
      61: "slight rain",
      63: "moderate rain",
      65: "heavy rain",
      66: "light freezing rain",
      67: "heavy freezing rain",
      71: "slight snow fall",
      73: "moderate snow fall",
      75: "heavy snow fall",
      77: "snow grains",
      80: "slight rain showers",
      81: "moderate rain showers",
      82: "violent rain showers",
      85: "slight snow showers",
      86: "heavy snow showers",
      95: "thunderstorm",
      96: "thunderstorm with slight hail",
      99: "thunderstorm with heavy hail",
    };

    res.json({
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      description: weatherCodes[current.weather_code] || "unknown",
    });
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.post("/api/recommendation", async (req, res) => {
  const {
    plot,
    crop,
    last_irrigation_liters,
    last_irrigation_date,
    soil_type,
    humidity,
    temperature,
    forecast_rain_mm,
  } = req.body;

  if (
    !plot ||
    !crop ||
    last_irrigation_liters === undefined ||
    !last_irrigation_date ||
    !soil_type ||
    humidity === undefined ||
    temperature === undefined ||
    forecast_rain_mm === undefined
  ) {
    return res.status(400).json({
      error:
        "All fields are required: plot, crop, last_irrigation_liters, last_irrigation_date, soil_type, humidity, temperature, forecast_rain_mm",
    });
  }

  try {
    // Calculate days since last irrigation
    const lastDate = new Date(last_irrigation_date);
    const daysSince = Math.floor(
      (new Date() - lastDate) / (1000 * 60 * 60 * 24)
    );

    // Use local water-balance algorithm instead of external AI model
    const area = req.body.area || 100; // default area (m²) if not provided
    const farmData = {
      cropType: crop,
      soilType: soil_type,
      area,
      lastIrrigationDate: last_irrigation_date,
    };
    const weatherData = {
      temp: temperature,
      humidity,
      precip: forecast_rain_mm,
    };

    const calc = calculateWaterNeed(farmData, weatherData);

    // Risk assessment based on net irrigation depth (mm)
    let risk = "medium";
    if (calc.netIrr_mm === 0) risk = "low";
    else if (calc.netIrr_mm >= 20) risk = "high";
    else if (calc.netIrr_mm >= 8) risk = "medium";
    else risk = "low";

    const recommendationText =
      calc.waterAmount === 0
        ? `No irrigation needed. ${calc.reason}`
        : `Apply approximately ${calc.waterAmount} L (${calc.netIrr_mm.toFixed(
            2
          )} mm over ${area} m²). ${calc.reason}`;

    res.json({ recommendation: recommendationText, risk });
  } catch (error) {
    console.error("Error generating recommendation:", error.message);
    console.error("Full error:", error);
    res.status(500).json({
      error: "Failed to generate recommendation",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
