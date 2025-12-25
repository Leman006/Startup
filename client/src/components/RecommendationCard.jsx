import React from "react";
import { Seedling, CloudRain } from "lucide-react";

export default function RecommendationCard({
  title = "Recommendation of the Day",
  message,
  suggestionLiters,
  accent = "accent",
}) {
  return (
    <aside className="card w-full">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-accent/10 text-accent">
          <Seedling className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="muted font-medium">{title}</h4>
          <p className="mt-1 text-gray-800 text-base font-semibold">
            {message ||
              "Apply supplemental irrigation to maintain root zone moisture."}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>Estimated: {suggestionLiters ?? 0} L</span>
            </div>
            <button
              className="bg-primary hover:bg-green-600 text-white rounded-xl px-4 py-2 text-sm shadow-sm transition"
              aria-label="Apply recommendation"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
