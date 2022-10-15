const express = require("express");
const router = express.Router();
const allProduct = require("../../controller/tours.controller");
const viewCount = require("../../middleware/viewCount");

router.route("/").get(allProduct.getAllTours).post(allProduct.createTours);
router.route("/cheapest").get(allProduct.chepestProduct);
router.route("/:id").get(viewCount, allProduct.getToursById);

module.exports = router;
