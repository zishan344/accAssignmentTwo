const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    unique: [true, "Name is not uniq.Please provide a unique name"],
  },
  image: {
    // data: Buffer,
    // contentType: String,
    type: String,
    required: [true, "must be required"],
  },
  phone: {
    type: Number,
    unique: [true, "must be set unique Phone Number"],
    required: [true],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
    },
    massage: "Phone Number must be an integer",
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price can't be negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
    },
    message: "price must be an integer",
  },
  description: {
    type: String,
    required: true,
    trim: true, //cut the external space
  },
  count: { type: Number, default: 0 },
});
const Tours = mongoose.model("Tours", tourSchema);
module.exports = Tours;
