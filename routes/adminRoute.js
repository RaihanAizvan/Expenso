const express = require("express")
const router = express.Router()
const controller = require("../controllers/adminController.js")
const middleware = require("../middleware/adminMiddleware.js")

router.get("/", middleware.isAdmin, controller.getAdmin)

router.get("/login", controller.getLogin)

router.post("/login", controller.postLogin)

router.get("/home",middleware.isAdmin, controller.getHome)

router.post('/logout',controller.postLogout)

router.get('/deleteUser',  controller.getDeleteUser)

module.exports = router

