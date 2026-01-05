import React, { useState, useEffect, useCallback } from "react";
import {
  Droplet,
  CloudRain,
  Thermometer,
  MapPin,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const SmartIrrigationDashboard = () => {
  const [weather, setWeather] = useState({
    temperature: 22,
    humidity: 65,
    description: "overcast",
    precipitation: 0,
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableCrops, setAvailableCrops] = useState([
    "Tomatoes",
    "Wheat",
    "Corn",
  ]);
  const [availableSoilTypes, setAvailableSoilTypes] = useState([
    "Loam",
    "Clay",
    "Sandy",
  ]);
  const [formData, setFormData] = useState({
    plot: "Field A",
    crop: "Tomatoes",
    soil_type: "Loam",
    area: "500",
    last_irrigation_date: new Date().toISOString().split("T")[0],
    last_irrigation_liters: "100",
    latitude: "37.7749",
    longitude: "-122.4194",
  });

  const loadWeatherData = useCallback(
    async (lat = formData.latitude, lon = formData.longitude) => {
      try {
        const response = await axios.get(
          `https://deploy-qsxy.onrender.com/api/weather`,
          {
            params: { lat, lon },
          }
        );
        setWeather(response.data);
      } catch (e) {
        console.error("Weather error", e);
      }
    },
    [formData.latitude, formData.longitude]
  );

  const getRecommendation = async () => {
    setLoading(true);
    try {
      const requestData = {
        ...formData,
        humidity: weather.humidity,
        temperature: weather.temperature,
        forecast_rain_mm: weather.precipitation || 0,
      };
      const response = await axios.post(
        "https://deploy-qsxy.onrender.com/api/recommendation",
        requestData
      );
      setRecommendation(response.data);
    } catch (e) {
      setRecommendation({
        recommendation: "System offline. Check connection.",
        risk: "high",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newCoords = {
          latitude: pos.coords.latitude.toFixed(4),
          longitude: pos.coords.longitude.toFixed(4),
        };
        setFormData((prev) => ({ ...prev, ...newCoords }));
        loadWeatherData(newCoords.latitude, newCoords.longitude);
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="h-full flex flex-col gap-8 overflow-hidden max-h-[calc(90vh-100px)] animate-in fade-in duration-700">
      {/* 1. ВЕРХНЯЯ ПАНЕЛЬ: УВЕЛИЧЕННЫЕ СТАТЫ */}
      <div className="flex items-center justify-between px-2 shrink-0">
        <div className="flex gap-12">
          <CompactStat
            label="Temperature"
            value={`${weather.temperature}°C`}
            icon={<Thermometer size={18} className="text-orange-400" />}
          />
          <CompactStat
            label="Humidity"
            value={`${weather.humidity}%`}
            icon={<Droplet size={18} className="text-blue-400" />}
          />
          <CompactStat
            label="Condition"
            value={weather.description}
            icon={<CloudRain size={18} className="text-slate-400" />}
          />
        </div>
        <div className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[11px] font-black text-white/60 uppercase tracking-widest">
            Live System
          </span>
        </div>
      </div>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* ФОРМА (7/12) */}
        <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-[40px] p-10 flex flex-col justify-between shadow-2xl">
          <div className="space-y-10">
            <h3 className="text-base font-bold text-white/40 uppercase tracking-[0.4em]">
              Field Configuration
            </h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-10">
              <ModernInput
                label="Crop Type"
                value={formData.crop}
                onChange={(v) => setFormData((p) => ({ ...p, crop: v }))}
                isSelect
                options={availableCrops}
              />
              <ModernInput
                label="Soil Type"
                value={formData.soil_type}
                onChange={(v) => setFormData((p) => ({ ...p, soil_type: v }))}
                isSelect
                options={availableSoilTypes}
              />
              <ModernInput
                label="Area (m²)"
                value={formData.area}
                type="number"
                onChange={(v) => setFormData((p) => ({ ...p, area: v }))}
              />
              <ModernInput
                label="Last Volume (L)"
                value={formData.last_irrigation_liters}
                type="number"
                onChange={(v) =>
                  setFormData((p) => ({ ...p, last_irrigation_liters: v }))
                }
              />
              <ModernInput
                label="Latitude"
                value={formData.latitude}
                onChange={(v) => setFormData((p) => ({ ...p, latitude: v }))}
              />
              <ModernInput
                label="Longitude"
                value={formData.longitude}
                onChange={(v) => setFormData((p) => ({ ...p, longitude: v }))}
              />
            </div>
          </div>

          <button
            onClick={getRecommendation}
            disabled={loading}
            className="w-full mt-10 py-6 bg-white text-black rounded-[24px] font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center justify-center gap-4 active:scale-[0.97] shadow-xl"
          >
            {loading ? (
              <RefreshCw className="animate-spin" size={20} />
            ) : (
              "Analyze & Plan Irrigation"
            )}
          </button>
        </div>

        {/* РЕЗУЛЬТАТ (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div
            className={`flex-1 p-10 rounded-[40px] border transition-all flex flex-col justify-center relative overflow-hidden ${
              recommendation?.error
                ? "bg-red-500/10 border-red-500/20"
                : "bg-emerald-500/5 border-emerald-500/10"
            }`}
          >
            <div className="absolute -right-6 -bottom-6 opacity-5">
              <Droplet size={200} />
            </div>
            <h3 className="text-[11px] font-black text-white/30 uppercase tracking-[0.5em] mb-6 text-center lg:text-left">
              Recommendation
            </h3>
            <p className="text-2xl md:text-3xl font-light text-white leading-tight z-10 text-center lg:text-left tracking-tight">
              {recommendation
                ? recommendation.recommendation
                : "Update configuration to generate strategy."}
            </p>
            {recommendation?.risk && (
              <div className="mt-8 flex justify-center lg:justify-start items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                  Risk Level:
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-md">
                  {recommendation.risk}
                </span>
              </div>
            )}
          </div>

          <div className="h-1/3 p-10 bg-white/[0.03] border border-white/10 rounded-[40px] flex flex-col justify-center space-y-6 shadow-inner">
            <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">
              System Insights
            </h4>
            <div className="space-y-4">
              <InsightRow label="Evaporation" value="Low Potential" />
              <InsightRow label="Optimal Window" value="05:00 — 08:00 AM" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ С УВЕЛИЧЕННЫМ ТЕКСТОМ ---

const CompactStat = ({ label, value, icon }) => (
  <div className="flex items-center gap-5">
    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-0.5">
        {label}
      </span>
      <span className="text-xl font-bold text-white/90 tracking-tight">
        {value}
      </span>
    </div>
  </div>
);

const InsightRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2">
    <span className="text-sm text-white/40 font-medium tracking-wide">
      {label}
    </span>
    <span className="text-sm text-white font-bold tracking-tight">{value}</span>
  </div>
);

const ModernInput = ({
  label,
  value,
  onChange,
  type = "text",
  isSelect,
  options,
}) => (
  <div className="group border-b-2 border-white/5 focus-within:border-emerald-500/40 pb-2 transition-all">
    <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] group-focus-within:text-emerald-500/60 transition-colors">
      {label}
    </label>
    {isSelect ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-lg font-bold outline-none text-white cursor-pointer appearance-none pt-1"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#121412] text-white py-4">
            {o}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-lg font-bold outline-none text-white pt-1 placeholder:text-white/10"
      />
    )}
  </div>
);

export default SmartIrrigationDashboard;
