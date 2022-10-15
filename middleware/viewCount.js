const Tours = require("../model/mode");

let count = 0;
const viewCount = async (req, res, next) => {
  const { id } = req.params;
  const tours = await Tours.find({ _id: id });
  count = tours[0].count;
  // count = toursCount;
  count++;
  console.log(count);
  const updateCounter = await Tours.updateOne(
    { _id: id },
    { $set: { count: count } }
  );
  console.log(updateCounter);
  // return count;
  next();
};
module.exports = viewCount;
