import { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude.toString());
          setLon(longitude.toString());
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError("Не удалось получить местоположение. Введите координаты вручную.");
        }
      );
    } else {
      setError("Геолокация не поддерживается вашим браузером.");
    }
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `http://localhost:5000/weather?lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lat || !lon) {
      setError("Введите координаты");
      return;
    }
    await fetchWeather(parseFloat(lat), parseFloat(lon));
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Latitude:</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="55.7558"
          />
        </div>
        <div className="input-group">
          <label>Longitude:</label>
          <input
            type="number"
            step="any"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="37.6173"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-info">
          <h2>Weather Data</h2>
          <div className="weather-item">
            <span className="label">Temperature:</span>
            <span className="value">{weather.temperature}°C</span>
          </div>
          <div className="weather-item">
            <span className="label">Humidity:</span>
            <span className="value">{weather.humidity}%</span>
          </div>
          <div className="weather-item">
            <span className="label">Rain (1h):</span>
            <span className="value">{weather.rain} mm</span>
          </div>
          <div className="weather-item">
            <span className="label">Description:</span>
            <span className="value">{weather.description}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
