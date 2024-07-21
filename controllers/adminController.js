const bcrypt = require("bcrypt")
const Collection = require("mongoose")
const user = require("../models/user")
const path = require("path")
const env = require("dotenv").config()

const adminDetails = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: "admin",
}

exports.getAdmin = (req, res, next) => {
 
    res.redirect("/admin/home")
  
}
exports.getLogin = (req, res, next) => {
  if (req.session.adminEmail && req.session.adminEmail === adminDetails.email) {
    res.redirect("/admin/home")
  } else {
    res.render("admin/login")
  }
}
exports.postLogin = (req, res) => {
  if (
    req.body.email === adminDetails.email &&
    req.body.password === adminDetails.password
  ) {
    req.session.adminEmail = req.body.email
    res.redirect("/admin/home")
    console.log(`Admin logged in at ${Date.now()}`)
  } else {
    res.render("admin/login", {
      error: "Invalid Email or Password",
      email: req.body.email,
    })
  }
  
}

exports.getHome = async (req, res) => {
  let userDetails;
  try{
    userDetails = await user.find()
  
  }
  catch(error){
    console.error("Error fetching user details:", error)
    res.status(500).send("Internal Server Error")
  }
  res.render('admin/adminHome',{user:userDetails})
}


exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err
      console.log(err)
    }
    res.redirect("/admin")
  })
}