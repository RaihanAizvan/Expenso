const mongoose = require("mongoose")

// const connection = "mongodb+srv://raihan:raihan6238880997@cluster0.hfx7kcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
  .connect(
    "mongodb+srv://raihan:raihan6238880997@cluster0.hfx7kcx.mongodb.net/expenso?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Error connecting to database", err))

const userShcema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  darkTheme: {
    // this will store the current theme of user
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const userCollection = new mongoose.model("User", userShcema)

module.exports = userCollection
