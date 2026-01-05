import React from "react";
import { Thermometer, Droplet, Power, Activity } from "lucide-react";

export default function InfoCard({ label, value, icon, status = "Normal" }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-[32px] border border-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Еле заметный декоративный градиент на фоне */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#f1f3f0] rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-125 duration-500 opacity-50"></div>

      <div className="relative z-10 flex items-center gap-5">
        {/* Контейнер иконки в стиле Soft UI */}
        <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#f1f3f0] flex items-center justify-center text-[#5c7457] shadow-inner transition-colors group-hover:bg-white group-hover:text-[#3d513a]">
          {/* Если иконка передается как компонент, мы можем ее клонировать с нужным размером */}
          {React.cloneElement(icon, { size: 24, strokeWidth: 2.5 })}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            {/* Метка в стиле Apple/Modern UI */}
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">
              {label}
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#2d3a2a] tracking-tight">
                {value}
              </span>
              {/* Добавляем индикатор "живости" данных */}
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1 mb-1.5"></span>
            </div>

            {/* Дополнительная строчка статуса как на референсе */}
            <div className="flex items-center gap-1 mt-1">
              <Activity size={10} className="text-[#5c7457] opacity-40" />
              <span className="text-[9px] font-bold text-[#5c7457]/60 uppercase tracking-tighter">
                System {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
