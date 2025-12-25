const { getRecommendation } = require("../services/recommend");

function getRecommendations(req, res) {
  const recommendation = getRecommendation();
  res.json(recommendation);
}

module.exports = {
  getRecommendations,
};

