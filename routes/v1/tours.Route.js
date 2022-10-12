const express = require("express");
const router = express.Router();
const allProduct = require("../../controller/tours.controller");

router.route("/").get(allProduct.getAllTours).post(allProduct.createTours);

module.exports = router;
