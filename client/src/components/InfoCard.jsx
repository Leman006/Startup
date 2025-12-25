import React from "react";
import { Thermometer, Droplet, Power } from "lucide-react";

export default function InfoCard({ label, value, icon }) {
  return (
    <div className="card flex items-center gap-4">
      <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="muted">{label}</div>
        <div className="value">{value}</div>
      </div>
    </div>
  );
}
