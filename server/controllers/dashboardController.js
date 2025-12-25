const { getLastLog, getTotalWater, getAllLogs } = require("../storage/data");

function getDashboard(req, res) {
  const lastLog = getLastLog();
  const totalWater = getTotalWater();
  const logs = getAllLogs();

  // Определение предупреждения
  let warning = "normal";
  let warningMessage = "Норма";

  if (logs.length > 0) {
    const avgWater = totalWater / logs.length;
    const lastWater = lastLog.water;

    if (lastWater > avgWater * 1.5 && logs.length > 1) {
      warning = "overflow";
      warningMessage = "Риск перелива";
    } else if (lastWater < avgWater * 0.5 && logs.length > 1) {
      warning = "drought";
      warningMessage = "Возможна засуха";
    }
  }

  res.json({
    lastIrrigation: lastLog || null,
    totalWater: totalWater,
    totalLogs: logs.length,
    warning: warning,
    warningMessage: warningMessage,
  });
}

module.exports = {
  getDashboard,
};

