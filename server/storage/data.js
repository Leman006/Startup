// In-memory хранилище данных
const irrigationLogs = [];

function addLog(log) {
  const newLog = {
    id: irrigationLogs.length + 1,
    ...log,
    createdAt: new Date().toISOString(),
  };
  irrigationLogs.push(newLog);
  return newLog;
}

function getAllLogs() {
  return [...irrigationLogs];
}

function getLastLog() {
  return irrigationLogs.length > 0
    ? irrigationLogs[irrigationLogs.length - 1]
    : null;
}

function getTotalWater() {
  return irrigationLogs.reduce((sum, log) => sum + (log.water || 0), 0);
}

module.exports = {
  addLog,
  getAllLogs,
  getLastLog,
  getTotalWater,
};

