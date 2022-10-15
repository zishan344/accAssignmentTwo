const Tours = require("../model/mode");
const viewCount = async (view) => {
  let count = await view++;
  const setCount = () => {
    count++;
    return count;
  };
  console.log(setCount());
  return setCount;
};

module.exports = viewCount;
