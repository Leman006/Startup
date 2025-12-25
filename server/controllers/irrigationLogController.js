const { addLog } = require("../storage/data");

function createLog(req, res) {
  const { zone, crop, water, date } = req.body;

  if (!zone || !crop || !water || !date) {
    return res.status(400).json({
      error: "Необходимы поля: zone, crop, water, date",
    });
  }

  const log = addLog({ zone, crop, water, date });
  res.json({
    message: "Запись добавлена",
    log,
  });
}

module.exports = {
  createLog,
};

