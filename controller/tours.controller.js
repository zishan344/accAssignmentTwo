const Tours = require("../model/mode");

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
    res
      .status(200)
      .json({
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
