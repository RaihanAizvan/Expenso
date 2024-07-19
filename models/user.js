const mongoose = require("mongoose")
require("dotenv").config() // Ensure this is at the top

// Log environment variables
console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("MONGODB_URI:", process.env.MONGODB_URI)

// Database connection
const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb+srv://raihan:raihan6238880997@cluster0.hfx7kcx.mongodb.net/expenso?retryWrites=true&w=majority&appName=Cluster0" // Replace with your local MongoDB URI
mongoose
  .connect(dbURI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Error connecting to database", err))

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  darkTheme: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const userCollection = mongoose.model("User", userSchema)

module.exports = userCollection
