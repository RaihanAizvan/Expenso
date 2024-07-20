const bcrypt = require("bcrypt")
const user = require("../models/user")


exports.getEntry = (req, res) => {
  req.session.adminEmail=false
  if (req.session && req.session.user) {
    res.redirect("/home")
  } else {
    res.render("entry/entry")
  }
  
}



exports.postLogin = async (req, res) => {
  try {
    console.log(`Attempting to find user with email: ${req.body.email}`)
    const currentUserDetails = await user.findOne({ email: req.body.email })

    if (!currentUserDetails) {
      console.log("No user found with the provided email.")
      res.render("login/login", {
        error: "Invalid email address",
        email: req.body.email,
      })
    } else if (
      !(await bcrypt.compare(req.body.password, currentUserDetails.password))
    ) {
      res.render("login/login", {
        error: "Invalid password",
        email: req.body.email,
      })
    } else {
      req.session.user = req.body.email
      console.log(
        `${currentUserDetails.name} logged in at ${Date.now().toString()}`
      )
      res.redirect("/home")
    }
  } catch (error) {
    console.error("Error during login process:", error)
    res.status(500).send("Internal Server Error")
  }
  console.log(req.session)
}

exports.getLogout = async (req, res) => {
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
}

exports.getLogin = (req, res) => {
  req.session.adminEmail=false
  if (req.session && req.session.user) {
    res.redirect("/home")
  } else {
    res.render("login/login")
  }
}

exports.getSignup = (req, res) => {
  req.session.adminEmail=false
  if (req.session && req.session.user) {
    res.redirect("/home")
  } else {
    res.render("login/signup")
  }
}

exports.postSignup = async (req, res) => {
  const currentUserDetails = await user.findOne({ email: req.body.email })
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  console.log(currentUserDetails)

  if (currentUserDetails) {
    return res.render("login/signup", {
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
}

exports.getHome = async (req, res) => {
  req.session.adminEmail=false
  try {
    const currentUserDetails = await user.findOne({ email: req.session.user })
    res.render("home/home", {
      loggedIn: true,
      name: currentUserDetails.name,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}
