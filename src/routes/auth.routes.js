import { Router } from "express";

import {validate} from '../middlewares/validator.middlewares.js'
import {userRegistrationValidator, userLoginValidator} from '../validators/index.js'

import {
    registerUser,
    loginUser,
    verifyEmail
} from "../controllers/auth.controllers.js"

const router = Router()

router.route("/register").post(userRegistrationValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(),validate,  loginUser)
router.route("/verify/:verifyToken").get(verifyEmail)


export default router