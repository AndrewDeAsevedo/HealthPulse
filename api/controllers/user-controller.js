const getUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API is working.",
  });
};

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("listening on port and connected to db", process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });
const db = mongoose.connection;

module.exports = {
  getUser,
};
