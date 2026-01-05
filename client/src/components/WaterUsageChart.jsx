import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const WaterUsageChart = ({ data = [], period = "Week" }) => {
  // Используем переданные данные или данные по умолчанию
  const chartData =
    data.length > 0
      ? data
      : [
          { day: "Wed", liters: 650 },
          { day: "Thu", liters: 720 },
          { day: "Fri", liters: 580 },
          { day: "Sat", liters: 690 },
          { day: "Sun", liters: 750 },
          { day: "Mon", liters: 620 },
          { day: "Tue", liters: 810 },
        ];

  // Кастомный тултип в стиле Glassmorphism
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50">
          <p className="text-[10px] font-bold text-[#5c7457] uppercase tracking-widest mb-1">
            Consumption
          </p>
          <p className="text-lg font-black text-[#2d3a2a]">
            {payload[0].value}{" "}
            <span className="text-sm font-medium text-gray-400">Liters</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          barGap={8}
        >
          {/* Убираем вертикальные линии, оставляем только очень бледные горизонтальные */}
          <CartesianGrid
            vertical={false}
            stroke="#f1f3f0"
            strokeDasharray="0"
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 600 }}
            dy={15}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }}
            dx={-10}
            tickFormatter={(value) => `${value}L`}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f1f3f0", radius: 16 }} // Подсветка при наведении как на фото
          />

          <Bar
            dataKey="liters"
            radius={[12, 12, 12, 12]} // Полностью скругленные бары
            maxBarSize={45}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // Выделяем последний столбец более темным цветом, остальные — мягким
                fill={index === chartData.length - 1 ? "#5c7457" : "#c5d1c2"}
                className="transition-all duration-500 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterUsageChart;
