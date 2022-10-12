const app = require("./app");
const colors = require("colors");
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("Database connection successfully".cyan.bold));
app.listen(port, () => {
  console.log(`server running  port  ${port}`.inverse.bold);
});
