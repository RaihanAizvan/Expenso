const express = require("express")
const app = express()
const session = require("express-session")
const path = require("path")
const router = require("./routes/route")
const noCachee = require("nocache")
const mongoose = require("mongoose")
const connection = require("./models/user")

const port = process.env.PORT || 8001

app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))
app.use(express.json())
app.set("view engine", "ejs")
app.use(noCachee())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
)

app.use("/", router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

