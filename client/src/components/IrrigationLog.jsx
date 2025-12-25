import React from "react";
import { CheckCircle, Seedling } from "lucide-react";

export default function IrrigationLog({ entries = [] }) {
  return (
    <div className="card w-full">
      <h3 className="text-lg font-semibold mb-3">Irrigation Log</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead className="text-left text-slate-500 border-b">
            <tr>
              <th className="py-2">Crop</th>
              <th className="py-2">Date</th>
              <th className="py-2">Volume (L)</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center">
                    <Seedling className="w-5 h-5 text-green-600" />
                  </div>
                  <div>{e.crop}</div>
                </td>
                <td className="py-3">{e.date}</td>
                <td className="py-3">{e.volume}</td>
                <td className="py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      e.status === "ok"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {e.status === "ok" ? "OK" : "Check"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
