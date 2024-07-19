//********************************************************************** */

//* Initializing Express and setting up necessary modules*//
const express = require("express")
const app = express()
const session = require("express-session")
const path = require("path")
const noCachee = require("nocache")
const mongoose = require("mongoose")
const connection = require("./models/user")
const port = process.env.PORT || 8001

//********************************************************************** */

//* Setting up session configuration
const sessionSchema = session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
})

//********************************************************************** */

// Requiring route modules
const router = require("./routes/route")
const adminRouter = require("./routes/adminRoute")

//********************************************************************** */

// Setting view engine and views directory
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//********************************************************************** */

// Setting up middleware
app.use(express.static("public"))
app.use(express.json())
app.use(noCachee())
app.use(express.urlencoded({ extended: true }))
app.use(sessionSchema)
app.use("/admin", adminRouter)
app.use("/", router)

//********************************************************************** */

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

//***********************************************************************/
