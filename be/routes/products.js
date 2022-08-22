const express = require("express");
const products = require("../data/products");
const data = require("../data/products");
const router = express.Router();

// 1. return all products
router.get("/", function (req, res, next) {
  res.send(data);
});

// score for characteristics
const scores = {
  "Humane": 1,
  "Locally Produced": 1,
  "Healthy": 1,
  "Plastic-Free": 2,
  "Unhealthy": -1,
  "Wasteful": -1,
};

// function to return score for product
function getScore(characteristics) {
  let score = 0;
  for (characteristic in characteristics) {
    score += scores[characteristics[characteristic]] || 0;
  }
  return score;
}

// 3. return products with associated score
router.get("/score", function (req, res, next) {
  let products = data;
  for (const product in products) {
    products[product].score = getScore(products[product].characteristics);
  }
  res.send(products);
});

// 2. return products with given characteristic
router.get("/:characteristic", function (req, res, next) {
  const products = data.filter((data) =>
    data.characteristics.includes(req.params.characteristic)
  );
  res.send(products);
});

module.exports = router;
