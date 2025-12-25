import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import InfoCard from "./components/InfoCard";
import RecommendationCard from "./components/RecommendationCard";
import IrrigationLog from "./components/IrrigationLog";
import { Droplet, CloudRain, Power } from "lucide-react";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Recommendation state
  const [recommendation, setRecommendation] = useState(null);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState("");
  const [formData, setFormData] = useState({
    plot: "",
    crop: "",
    last_irrigation_liters: "",
    last_irrigation_date: "",
    soil_type: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeather(latitude, longitude);
        },
        (err) => {
          setError(
            "Не удалось получить местоположение. Разрешите доступ к геолокации."
          );
          setLoading(false);
        }
      );
    } else {
      setError("Геолокация не поддерживается вашим браузером");
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather");
      }

      setWeather(data);
      // Auto-fill form with weather data
      setFormData((prev) => ({
        ...prev,
        humidity: data.humidity,
        temperature: data.temperature,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationSubmit = async (e) => {
    e.preventDefault();
    setRecLoading(true);
    setRecError("");
    setRecommendation(null);

    try {
      const payload = {
        ...formData,
        humidity: weather?.humidity || formData.humidity,
        temperature: weather?.temperature || formData.temperature,
        forecast_rain_mm: formData.forecast_rain_mm || 0,
        last_irrigation_liters: parseFloat(formData.last_irrigation_liters),
      };

      const response = await fetch("http://localhost:5000/api/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get recommendation");
      }

      setRecommendation(data);
    } catch (err) {
      setRecError(err.message);
    } finally {
      setRecLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-primary">
          Farm Irrigation Dashboard
        </h1>
      </header>

      {/* Top Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <InfoCard
          label="Estimated Soil Humidity"
          value={weather ? `${weather.humidity}%` : "—"}
          icon={<Droplet className="w-6 h-6 text-primary" />}
        />
        <InfoCard
          label="Precipitation (24h)"
          value={weather ? `${weather.description}` : "—"}
          icon={<CloudRain className="w-6 h-6 text-blue-400" />}
        />
        <InfoCard
          label="System Status"
          value={"OK"}
          icon={<Power className="w-6 h-6 text-green-600" />}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <IrrigationLog
            entries={[
              {
                crop: "Tomatoes",
                date: "2025-12-24",
                volume: "120",
                status: "ok",
              },
              {
                crop: "Apples",
                date: "2025-12-22",
                volume: "80",
                status: "ok",
              },
              {
                crop: "Lettuce",
                date: "2025-12-20",
                volume: "40",
                status: "check",
              },
            ]}
          />
        </div>
        <div className="col-span-1">
          <RecommendationCard
            title={"Recommendation of the Day"}
            message={recommendation ? recommendation.recommendation : undefined}
            suggestionLiters={
              recommendation
                ? parseInt(
                    recommendation.recommendation.match(/\d+\s?L/)?.[0]
                  ) || 0
                : 0
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
