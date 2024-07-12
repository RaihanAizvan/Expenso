const express = require("express")
const session = require("express-session")

const app = express()
let loggedIn = false

app.set("views", __dirname + "/views")
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

const user = {
  name: "a@gmail.com",
  password: "123456", // Password should be a string for comparison
}
//session config

app.use(
  session({
    secret: "123456", // This is a secret key to sign the session ID cookie.
    resave: false, // This forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false, // This forces a session that is "uninitialized" to be saved to the store.
    cookie: { secure: false }, // If true, requires an https-enabled website, i.e., HTTPS is necessary.
  })
)
//routes
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/home") // Redirect to dashboard if user is already logged in
  } else {
    res.render("home") // Render the login form if not logged in
  }
})

app.post("/home", (req, res) => {
  console.log("Received data:", req.body)
  // Check if the user is authenticated
  if (req.body.email === user.name && req.body.password === user.password) {
    console.log("Authentication successful")
    loggedIn = true
    req.session.user = req.body.email
    res.render("home", {
      loggedInn: loggedIn,
    }) // Render the dashboard page only if authentication is successful
    console.log("Is user logged:", loggedIn)
  } else {
    console.log("Authentication failed")
    res.render("form", {
      error: "Invalid username or password",
      email: req.body.email,
    }) // Redirect back to the login page if authentication fails
  }
})

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err)
    }
    res.clearCookie("connect.sid", { path: "/" }) // Clear the session cookie
    res.redirect("/login") // Redirect to login page
  })
})
app.get("/login", (req, res) => {
  res.render("form")
})

function isLogged(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect("/")
  }
}

// Use isLogged middleware for any routes that require authentication
app.get("/home", isLogged, (req, res) => {
  res.render("home")
  if (req.session.user) {
    console.log("User logged in: ", req.session.user)
    loggedIn = true
  }
})

app.listen(8001, (req, res) => {
  console.log("sever started to listen")
})
