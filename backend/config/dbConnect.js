const mongoose = require("mongoose");

/**
 * @brief Function to wait for connect with Mongoose
 */
const dbConnect = async () => {
  try {
    //This line of code is necessary to connect with the database of mongodb
    await mongoose.connect(process.env.MONGODB_URL, {
      //useCreateIndex: false, //Both are not more supported y mongoose version
      //useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Db is connected successfully");
  } catch (error) {
    console.log("Error " + error.message);
  }
};

module.exports = dbConnect;
