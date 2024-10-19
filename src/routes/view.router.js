import { Router } from "express";

import viewController from '../controllers/view.controller.js'
import strategyPolicies from "../middlewares/passportAndPolicies.js";

const router = new Router()

router.get('/', viewController.landingPage)

router.get('/register', viewController.registerPage)

router.get('/login', viewController.loginPage)

router.get('/profile', strategyPolicies('current',['USER']),viewController.profilePage)

export default router