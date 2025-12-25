const express = require("express");
const router = express.Router();
const { createLog } = require("../controllers/irrigationLogController");

router.post("/", createLog);

module.exports = router;
