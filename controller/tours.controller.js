const { query } = require("express");
const viewCount = require("../middleware/viewCount");

const Tours = require("../model/mode");
let count;
const counter = (view) => {
  count = view + 1;
};
exports.createTours = async (req, res) => {
  try {
    const tours = await Tours.create(req.body);

    res.status(200).json({
      status: "success",
      message: "data inserted successfully",
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "data is not inserted",
      error: err.message,
    });
  }
};
exports.getAllTours = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);
    console.log("orginal Object 1", req.query);
    console.log("orginal Object 2", filters);
    const querys = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      querys.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fieldBy = req.query.fields.split(",").join(" ");
      querys.fieldBy = fieldBy;
    }
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      querys.skip = skip;
      querys.limit = limit;
    }
    const tours = await Tours.find(filters)
      .skip(querys.skip)
      .limit(querys.limit)
      .select(querys.fieldBy)
      .sort(querys.sortBy);
    const totalTours = await Tours.countDocuments(filters);
    console.log(totalTours);
    const pageCount = Math.ceil(totalTours / querys.limit);

    res.status(200).json({
      status: "success",
      message: "data get successfully",
      data: { pageCount, totalTours, tours },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get data",
      error: err.message,
    });
  }
};
exports.chepestProduct = async (req, res) => {
  try {
    const tours = await Tours.find({}).sort({ price: 1 }).limit(3);
    res.status(200).json({
      status: "success",
      message: "data get successfully",
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get data",
      error: err.message,
    });
  }
};
exports.trendingTours = async (req, res) => {
  try {
    const tours = await Tours.find({}).sort({ count: -1 }).limit(3);
    res.status(200).json({
      status: "success",
      message: "data get successfully",
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get data",
      error: err.message,
    });
  }
};
exports.getToursById = async (req, res) => {
  try {
    const { id } = req.params;
    const tours = await Tours.find({ _id: id });
    // let viewRoute = await tours[0].count;

    // const updateViewer = await Tours.updateOne({ _id: id });
    res.status(200).json({
      status: "success",
      message: "data get successfully",
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get data",
      error: err.message,
    });
  }
};
exports.updateTours = async (req, res) => {
  try {
    const { id } = req.params;
    const tours = await Tours.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );

    if (!tours.modifiedCount) {
      return res.status(404).json({
        status: "failed",
        message:
          "can't update data sorry something is wrong please try again later",
      });
    }
    res.status(200).json({
      status: "success",
      message: "data update successfully",
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't updates data",
      error: err.message,
    });
  }
};
