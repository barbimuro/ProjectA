import projectController from "../controllers/project.controller.js";
import {Router} from 'express';
import strategyPolicies from "../middlewares/passportAndPolicies.js";

const router = Router()

router.get('/', projectController.getAllProjects)

router.post('/newProject', strategyPolicies('current',(['USER'])), projectController.createNewProject)

export default router