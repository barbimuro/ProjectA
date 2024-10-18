import { Router } from "express";

import {landingPage} from '../controllers/view.controller.js'

const router = new Router()

router.get('/', landingPage)

export default router