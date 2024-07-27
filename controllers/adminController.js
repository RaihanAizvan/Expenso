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
  let userDetails
  try {
    var search = ""
    if (req.query.search) {
      search = req.query.search
    }
    userDetails = await user.find({
      $or: [
        { name: { $regex: "^" + search, $options: "i" } },
       
      ],
    })

    res.render("admin/adminHome", { user: userDetails })
  } catch (error) {
    console.error("Error fetching user details:", error)
    res.status(500).render("admin/login", { dbError: 'Cannot connect to database' })
  }
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

exports.getDeleteUser = async(req, res) => {
  try{
    await user.deleteOne({_id:req.query.id})
    res.redirect('/admin')
  }
  catch (err) {
    console.log('error deleting user', err);
  }
}

exports.getEditUser= async(req, res) => {
  console.log('entered the /edituser',req.body);
  try {
    await user.updateOne({_id:req.query.id},{$set:{name:req.body.editName, email: req.body.editEmail}})
    res.redirect('/admin')
  } catch (error) {
    console.log('error',err);
  }
}