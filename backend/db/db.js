const mongoose = require('mongoose')

const connectToDB = async() => {
    mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = {
  connectToDB
}