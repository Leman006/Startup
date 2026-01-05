import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Calendar,
  Sparkles,
  ChevronDown,
  Filter,
} from "lucide-react";
import axios from "axios";
import WaterUsageChart from "../components/WaterUsageChart";
import CropUsageList from "../components/CropUsageList";

const WaterUsageAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Week");
  const [selectedCrop, setSelectedCrop] = useState("All Crops");
  const [loading, setLoading] = useState(false);
  const [waterUsageData, setWaterUsageData] = useState(null);
  const [availableCrops, setAvailableCrops] = useState(["All Crops"]);

  useEffect(() => {
    loadWaterUsageData();
  }, [selectedPeriod, selectedCrop]);
  useEffect(() => {
    loadAvailableCrops();
  }, []);

  const loadWaterUsageData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://deploy-qsxy.onrender.com/api/water-usage",
        {
          params: { period: selectedPeriod, crop: selectedCrop },
        }
      );
      setWaterUsageData(response.data);
    } catch (error) {
      setWaterUsageData({
        lastDay: 408,
        last7Days: 5290,
        last30Days: 22750,
        chartData: [],
        cropData: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableCrops = async () => {
    try {
      const response = await axios.get(
        "https://deploy-qsxy.onrender.com/api/water-usage"
      );
      setAvailableCrops(["All Crops", ...response.data]);
    } catch (e) {}
  };

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-1000 overflow-hidden">
      {/* HEADER: Компактный и стильный */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0 px-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-[2px] bg-emerald-500/50 rounded-full"></div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em]">
              Analytics Engine
            </span>
          </div>
          <h1 className="text-3xl font-light text-white tracking-tight">
            Water Intelligence
          </h1>
        </div>

        {/* ПЕРИОДЫ: Стеклянная капсула */}
        <div className="flex p-1 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-2xl">
          {["Week", "Month", "Year"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                selectedPeriod === period
                  ? "bg-white text-black shadow-xl"
                  : "text-white/30 hover:text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY GRID: Три компактных карточки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        <AnalyticCard
          title={selectedPeriod === "Week" ? "Daily Avg" : "Weekly Avg"}
          value={waterUsageData?.lastDay}
          trend="+12.4%"
          loading={loading}
        />
        <AnalyticCard
          title="Total Consumption"
          value={waterUsageData?.last7Days}
          trend="+350L"
          loading={loading}
        />
        <AnalyticCard
          title="Predictive Forecast"
          value={waterUsageData?.last30Days}
          trend="Stable"
          neutral
          loading={loading}
        />
      </div>

      {/* MAIN CONTENT: График и Распределение */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* CHART BOX */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-[40px] p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex justify-between items-center mb-8 shrink-0">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <TrendingUp size={18} />
              </div>
              <h2 className="text-lg font-medium text-white/90 tracking-tight">
                Consumption Flow
              </h2>
            </div>

            <div className="relative">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold text-white/60 appearance-none outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
              >
                {availableCrops.map((crop) => (
                  <option key={crop} value={crop} className="bg-[#1a1f1a]">
                    {crop}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"
                size={14}
              />
            </div>
          </div>

          <div className="flex-1 w-full min-h-[300px]">
            {loading ? (
              <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" />
            ) : (
              <WaterUsageChart
                data={waterUsageData?.chartData || []}
                period={selectedPeriod}
              />
            )}
          </div>
        </div>

        {/* DISTRIBUTION BOX */}
        <div className="lg:col-span-1 bg-[#1a1f1a] border border-emerald-500/10 rounded-[40px] p-8 flex flex-col relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8 shrink-0">
              <Sparkles className="text-emerald-400" size={18} />
              <h2 className="text-lg font-medium text-white/90 tracking-tight">
                Distribution
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <CropUsageList
                data={waterUsageData?.cropData || []}
                loading={loading}
              />
            </div>

            <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all shrink-0">
              Generate PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Под-компонент карточки
const AnalyticCard = ({ title, value, trend, neutral, loading }) => (
  <div className="bg-white/[0.03] border border-white/5 rounded-[32px] p-6 hover:border-white/10 transition-all group relative overflow-hidden">
    <div className="relative z-10">
      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4 group-hover:text-white/40 transition-colors">
        {title}
      </p>
      {loading ? (
        <div className="h-8 w-24 bg-white/5 animate-pulse rounded-lg" />
      ) : (
        <div className="flex items-end gap-3">
          <span className="text-3xl font-light text-white tracking-tighter">
            {value?.toLocaleString()}
          </span>
          <span className="text-xs text-white/20 mb-1.5 font-medium tracking-wide">
            Liters
          </span>
        </div>
      )}
      <div
        className={`mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-widest uppercase ${
          neutral
            ? "bg-white/5 text-white/40"
            : "bg-emerald-500/10 text-emerald-400"
        }`}
      >
        {trend}
      </div>
    </div>
  </div>
);

export default WaterUsageAnalysis;
