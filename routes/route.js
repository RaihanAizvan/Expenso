const express = require("express")
const router = express.Router()

// Route to handle the root path
router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard") // Redirect to dashboard if user is already logged in
  } else {
    res.render("form.ejs") // Render the login form if not logged in
  }
})

// Route to render the login form
router.get("/login", (req, res) => {
  res.render("form")
})

// Handling POST request for "/hello" path
router.post("/hello", (req, res) => {
  console.log(req.body)
})

// Handling POST request for "/home" path
router.post("/home", (req, res) => {
  console.log("Received data:", req.body)
  // Check if the user is authenticated
  if (req.body.email === user.name && req.body.password === user.password) {
    console.log("Authentication successful")
    req.session.user = req.body.email
    res.render("home") // Render the dashboard page only if authentication is successful
  } else {
    console.log("Authentication failed")
    res.render("form", {
      error: "Invalid username or password",
      email: req.body.email,
      sarath: "poda",
    }) // Redirect back to the login page if authentication fails
  }
})

// Route to handle user logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err)
    }
    res.clearCookie("connect.sid", { path: "/" }) // Clear the session cookie
    res.redirect("/")
  })
})

// Middleware to check if the user is logged in
function isLogged(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect("/")
  }
}

// Route to render the dashboard if user is logged in
router.get("/dashboard", isLogged, (req, res) => {
  res.render("test")
})

module.exports = router
