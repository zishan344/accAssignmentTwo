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
    const tours = await Tours.find({});
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
exports.getToursById = async (req, res) => {
  try {
    const { id } = req.params;

    const tours = await Tours.find({ _id: id });
    let viewRoute = await tours[0].count;
    counter(viewRoute);
    count += 1;
    console.log(count);

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
