import React from "react";
import { Wheat, Sprout, Circle, Leaf, ChevronRight } from "lucide-react";

const CropUsageList = ({ data = [], loading = false }) => {
  // Используем переданные данные или данные по умолчанию
  const crops =
    data.length > 0
      ? data.map((crop, index) => ({
          name: crop.name || `Crop ${index + 1}`,
          icon:
            index === 0 ? (
              <Wheat className="w-5 h-5" />
            ) : index === 1 ? (
              <Sprout className="w-5 h-5" />
            ) : index === 2 ? (
              <Circle className="w-5 h-5" />
            ) : (
              <Leaf className="w-5 h-5" />
            ),
          liters: crop.liters || 0,
          percentage: crop.percentage || 0,
          color:
            crop.color ||
            [
              "bg-[#5c7457]", // Sage Green
              "bg-[#7a8f75]", // Чуть светлее
              "bg-[#9db098]",
              "bg-[#c5d1c2]",
            ][index % 4],
        }))
      : [
          {
            name: "Wheat",
            icon: <Wheat className="w-5 h-5" />,
            liters: 1960,
            percentage: 37,
            color: "bg-[#5c7457]", // Тот самый Sage Green с фото
          },
          {
            name: "Corn",
            icon: <Sprout className="w-5 h-5" />,
            liters: 1250,
            percentage: 24,
            color: "bg-[#7a8f75]", // Чуть светлее
          },
          {
            name: "Tomatoes",
            icon: <Circle className="w-5 h-5" />,
            liters: 870,
            percentage: 16,
            color: "bg-[#9db098]",
          },
          {
            name: "Potatoes",
            icon: <Leaf className="w-5 h-5" />,
            liters: 720,
            percentage: 13,
            color: "bg-[#c5d1c2]",
          },
        ];

  return (
    <div className="space-y-6">
      {loading
        ? // Скелетон для загрузки
          [1, 2, 3, 4].map((index) => (
            <div key={index} className="space-y-3 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#f1f3f0] rounded-2xl"></div>
                <div className="flex-1">
                  <div className="h-4 bg-[#f1f3f0] rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-[#f1f3f0] rounded w-1/4"></div>
                </div>
                <div className="text-right">
                  <div className="h-5 bg-[#f1f3f0] rounded w-16 mb-1"></div>
                  <div className="h-3 bg-[#f1f3f0] rounded w-20"></div>
                </div>
              </div>
              <div className="w-full bg-[#f1f3f0] rounded-full h-3"></div>
            </div>
          ))
        : crops.map((crop, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="flex items-center space-x-4 mb-3">
                {/* Иконка в стиле Soft UI */}
                <div className="shrink-0 w-12 h-12 bg-[#f1f3f0] rounded-2xl flex items-center justify-center text-[#5c7457] shadow-inner transition-transform group-hover:scale-110">
                  {crop.icon}
                </div>

                {/* Инфо и бежевый тэг как на референсе */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-sm font-bold text-[#2d3a2a] truncate uppercase tracking-wider">
                        {crop.name}
                      </h4>
                      <div className="mt-1 inline-block px-2 py-0.5 bg-[#f6eadc] rounded-md text-[10px] font-bold text-[#8b7355] uppercase tracking-tighter">
                        Usage: {crop.percentage}%
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-black text-[#2d3a2a]">
                        {crop.liters.toLocaleString()} L
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        Total Volume
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Кастомный прогресс-бар (мягкий и широкий) */}
              <div className="w-full bg-[#f1f3f0] rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className={`${crop.color} h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(92,116,87,0.2)]`}
                  style={{ width: `${crop.percentage}%` }}
                />
              </div>
            </div>
          ))}

      {/* Кнопка "Show All" в стиле референса */}
      <button className="w-full mt-4 group flex items-center justify-center space-x-2 text-sm font-bold text-[#5c7457] hover:text-[#3d513a] py-4 bg-[#f1f3f0]/50 rounded-2xl transition-all border border-transparent hover:border-[#5c7457]/20">
        <span>View Detailed Analytics</span>
        <ChevronRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

export default CropUsageList;
