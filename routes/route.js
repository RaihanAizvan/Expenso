const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const { Collection } = require("mongoose")
const user = require("../models/user")

router.use(express.json())

// Middleware to check if user is logged in
function isLogged(req, res, next) {
  if (req.session && req.session.user) {
    next()
  } else {
    res.redirect("/login")
  }
}

// Middleware to set headers to avoid caching
function noCache(req, res, next) {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private")
  res.set("Pragma", "no-cache")
  res.set("Expires", "0")
  next()
}

router.get("/", (req, res) => {
  if (req.session && req.session.user) {
    res.redirect("/home")
  } else {
    res.render("entry")
  }
})

router.post("/login", async (req, res) => {
  const currentUserDetails = await user.findOne({ email: req.body.email })
  if (!currentUserDetails) {
    res.render("login", {
      error: "Invalid email address",
      email: req.body.email,
    })
  } else if (
    !(await bcrypt.compare(req.body.password, currentUserDetails.password))
  ) {
    res.render("login", {
      error: "Invalid password",
      email: req.body.email,
    })
  } else if (
    !(await bcrypt.compare(req.body.password, currentUserDetails.password)) &&
    !currentUser
  ) {
    res.render("login", {
      error: "Invalid password and email",
      email: req.body.email,
    })
  } else {
    req.session.user = req.body.email
    // req.session.email = req.body.email
    console.log(
      `${currentUserDetails.name} logged in at ${Date.now().toString()}`
    )
    res.redirect("/home")
  }
})

router.get("/logout", async (req, res) => {
  if (req.session && req.session.user) {
    const currentUserDetails = await user.findOne({ email: req.session.user })

    req.session.destroy((err) => {
      if (err) {
        console.log(err)
      }
      res.clearCookie("connect.sid", { path: "/" })
      res.redirect("/")
      console.log(`${currentUserDetails.name} logged out at ${Date.now()}`)
    })
  } else {
    res.redirect("/login")
  }
})

router.get("/login", (req, res) => {
  if (req.session && req.session.user) {
    res.redirect("/home")
  } else {
    res.render("login")
  }
})

router.get("/signup", (req, res) => {
  if (req.session && req.session.user) {
    res.redirect("/home")
  } else {
    res.render("signup")
  }
})

// Use isLogged and noCache middleware for any routes that require authentication
router.get("/home", isLogged, noCache, async (req, res) => {
  try {
    const currentUserDetails = await user.findOne({ email: req.session.user })
    res.render("home", {
      loggedIn: true,
      name: currentUserDetails.name,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

router.post("/signup", async (req, res) => {
  const currentUserDetails = await user.find()
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }

  if (!currentUserDetails) {
    return res.render("signup", {
      error: "User already exists",
      email: req.body.email,
      name: req.body.name,
    })
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)
  data.password = hashedPassword
  await user.create(data)
  console.log(`User ${data.name} created successfully`)
  res.redirect("/login")
})

module.exports = router
