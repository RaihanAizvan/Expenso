const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController.js")

router.get("/", controller.getEntry)

router.get("/login", controller.getLogin)

router.post("/login", controller.postLogin)

router.get("/signup", controller.getSignup)

router.post("/signup", controller.postSignup)

router.get("/logout", controller.getLogout)

router.get("/home", controller.isLogged, controller.noCache, controller.getHome)

module.exports = router
