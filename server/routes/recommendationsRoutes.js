const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../controllers/recommendationsController");

router.get("/", getRecommendations);

module.exports = router;

