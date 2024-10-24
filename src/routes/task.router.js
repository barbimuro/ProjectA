import { Router } from "express";

import taskController from "../controllers/task.controller.js";
import strategyPolicies from "../middlewares/passportAndPolicies.js";

const router = Router();

router.get('/', strategyPolicies('current',['USER']), taskController.getAllTasks);

router.post('/:pid/createTask', strategyPolicies('current',['USER']), taskController.createNewTask);

export default router