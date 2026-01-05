import React, { useState, useEffect } from "react";
import { Settings, Save, Check } from "lucide-react";
import axios from "axios";

const FarmProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    soilType: "Loam",
  });

  const [soilTypes, setSoilTypes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Загрузка данных при монтировании
  useEffect(() => {
    loadProfileData();
    loadReferenceData();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await axios.get(
        "https://deploy-qsxy.onrender.com/api/farm-profile"
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  const loadReferenceData = async () => {
    try {
      const soilTypesResponse = await axios.get(
        "https://deploy-qsxy.onrender.com/api/soil-types"
      );
      setSoilTypes(soilTypesResponse.data);
    } catch (error) {
      console.error("Error loading reference data:", error);
      // Установим значения по умолчанию в случае ошибки
      setSoilTypes(["Loam", "Clay", "Sandy", "Silt"]);
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const response = await axios.put(
        "https://deploy-qsxy.onrender.com/api/farm-profile",
        profileData
      );
      if (response.data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-[10px] font-black text-[#5c7457] uppercase tracking-[0.3em] mb-3">
          Configuration
        </h2>
        <h1 className="text-4xl font-black text-[#2d3a2a] tracking-tight">
          Farm Settings
        </h1>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-[40px] p-8 border border-white shadow-sm space-y-8">
        {/* Soil Type */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">
            Soil Type
          </label>
          <select
            value={profileData.soilType}
            onChange={(e) => handleInputChange("soilType", e.target.value)}
            className="w-full bg-[#f1f3f0] border-none rounded-2xl p-4 font-semibold appearance-none outline-none focus:ring-2 focus:ring-[#5c7457]/50 transition-all cursor-pointer"
          >
            {soilTypes.map((soil) => (
              <option key={soil} value={soil}>
                {soil}
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="flex-1 bg-[#5c7457] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#5c7457]/20 hover:bg-[#4a6146] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved Successfully
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmProfileSettings;
