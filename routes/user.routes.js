import Router from "express"

import {registerValidation} from '../validation/auth.js'
import checkAuth from "../utils/checkAuth.js"

const router = new Router()

import userController from "../controller/user.controller.js"

router.post("/register", registerValidation, userController.register)
router.post("/login", registerValidation, userController.login)
router.get("/me", checkAuth, userController.getMe)
router.put("/me", checkAuth, userController.editMe)
router.put("/subs/:id", checkAuth, userController.subscribe)
router.delete("/subs/:id", checkAuth, userController.unsubscribe)
router.get("/account/:id/subs", userController.getsubscriptions)
router.put("/add/song", checkAuth, userController.addSong)
router.delete("/song/:id", checkAuth, userController.deleteSong)
router.get("/account/:id", userController.getAccountId)
router.get("/accounts", userController.getAllAccount)

export default router