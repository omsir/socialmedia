const mongoose = require("mongoose");

// Replace 'your_database_url' with your actual MongoDB connection string.
const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
