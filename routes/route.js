const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController.js")
const middleware = require("../middleware/userMiddleware.js")


router.get("/", controller.getEntry)

router.get("/login", controller.getLogin)

router.post("/login", controller.postLogin)

router.get("/signup", controller.getSignup)

router.post("/signup", controller.postSignup)

router.get("/logout", controller.getLogout)

router.get("/home", middleware.isLogged, middleware.noCache, controller.getHome)


module.exports = router
