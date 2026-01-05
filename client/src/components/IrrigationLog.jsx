import React from "react";
import {
  CheckCircle,
  Sprout,
  AlertCircle,
  Calendar,
  Droplets,
} from "lucide-react";

export default function IrrigationLog({ entries = [] }) {
  // Тестовые данные, если пропсы пустые
  const displayEntries =
    entries.length > 0
      ? entries
      : [
          { crop: "Wheat", date: "2025-12-24", volume: 1200, status: "ok" },
          {
            crop: "Tomatoes",
            date: "2025-12-23",
            volume: 850,
            status: "check",
          },
          { crop: "Corn", date: "2025-12-22", volume: 1100, status: "ok" },
        ];

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-black text-[#2d3a2a] tracking-tight">
          Irrigation History
        </h3>
        <span className="text-[10px] font-bold text-[#5c7457] bg-[#f1f3f0] px-3 py-1 rounded-full uppercase tracking-widest">
          Recent 30 Days
        </span>
      </div>

      <div className="bg-white/40 backdrop-blur-sm rounded-[32px] border border-white/60 overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f8f9f8]/50 text-[#5c7457] text-[10px] font-black uppercase tracking-[0.15em] border-b border-white">
              <th className="py-5 px-8 text-left">Crop Entity</th>
              <th className="py-5 px-4 text-left">Applied Date</th>
              <th className="py-5 px-4 text-left">Volume</th>
              <th className="py-5 px-8 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/50">
            {displayEntries.map((e, i) => (
              <tr
                key={i}
                className="group hover:bg-white/60 transition-colors duration-300"
              >
                {/* Crop Column */}
                <td className="py-4 px-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f1f3f0] group-hover:bg-white flex items-center justify-center transition-all shadow-inner">
                      <Sprout className="w-6 h-6 text-[#5c7457]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#2d3a2a] text-sm">
                        {e.crop}
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                        Automatic System
                      </div>
                    </div>
                  </div>
                </td>

                {/* Date Column */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm">
                    <Calendar size={14} className="opacity-40" />
                    {new Date(e.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </td>

                {/* Volume Column */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-60"></div>
                    <span className="font-black text-[#2d3a2a] text-sm">
                      {e.volume.toLocaleString()} L
                    </span>
                  </div>
                </td>

                {/* Status Column */}
                <td className="py-4 px-8 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      e.status === "ok"
                        ? "bg-[#f2f9f1] text-[#5c7457] border border-[#d8e8d5]"
                        : "bg-orange-50 text-orange-600 border border-orange-100"
                    }`}
                  >
                    {e.status === "ok" ? (
                      <CheckCircle size={12} strokeWidth={3} />
                    ) : (
                      <AlertCircle size={12} strokeWidth={3} />
                    )}
                    {e.status === "ok" ? "Success" : "Review"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-[#5c7457]/30 hover:text-[#5c7457] transition-all">
        Download Full Report (.CSV)
      </button>
    </div>
  );
}
