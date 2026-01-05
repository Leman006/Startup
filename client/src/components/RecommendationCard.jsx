import React from "react";
import { Droplet, CloudRain, Lightbulb, ArrowRight } from "lucide-react";

export default function RecommendationCard({
  title = "Recommendation of the Day",
  message,
  suggestionLiters,
}) {
  return (
    <aside className="relative overflow-hidden bg-white/70 backdrop-blur-md rounded-[32px] border border-white p-8 shadow-sm group hover:shadow-md transition-all duration-500">
      {/* Декоративный элемент на фоне */}
      <div className="absolute -top-6 -right-6 p-12 bg-[#f1f3f0] rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700">
        <Lightbulb size={40} className="text-[#5c7457] opacity-20" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3.5 rounded-2xl bg-[#5c7457] text-white shadow-lg shadow-[#5c7457]/20">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-[#5c7457] uppercase tracking-[0.2em]">
              {title}
            </h4>
            <div className="h-0.5 w-8 bg-[#5c7457]/30 mt-1 rounded-full"></div>
          </div>
        </div>

        <p className="text-[#2d3a2a] text-lg font-bold leading-snug mb-8 max-w-[90%]">
          {message ||
            "Apply supplemental irrigation to maintain optimal root zone moisture levels."}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-[#f1f3f0]">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1 flex items-center gap-1">
              <CloudRain size={12} /> Predicted Volume
            </span>
            <span className="text-xl font-black text-[#2d3a2a]">
              {suggestionLiters ?? 480}{" "}
              <span className="text-sm font-medium">L</span>
            </span>
          </div>

          <button
            className="group/btn flex items-center gap-2 bg-[#3d513a] hover:bg-[#2d3a2a] text-white rounded-2xl px-8 py-4 text-sm font-black shadow-lg shadow-[#3d513a]/20 transition-all active:scale-95"
            aria-label="Apply recommendation"
          >
            <span>Apply Now</span>
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
