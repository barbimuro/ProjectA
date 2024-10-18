import { Router } from "express";

import userControllers from "../controllers/user.controller.js";
import strategyPolicies from "../middlewares/passportAndPolicies.js";

const router = Router();

router.get('/',userControllers.getAllUsers)

export default router
