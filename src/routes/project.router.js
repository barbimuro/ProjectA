import projectController from "../controllers/project.controller.js";
import {Router} from 'express';
import strategyPolicies from "../middlewares/passportAndPolicies.js";
import taskController from "../controllers/task.controller.js";

const router = Router()

router.get('/', projectController.getAllProjects)

router.post('/newProject', strategyPolicies('current',(['USER'])), projectController.createNewProject);

router.get('/:pid', strategyPolicies('current',['USER']), projectController.getProjectById);

router.post('/:pid/tasks', strategyPolicies('current',['USER']), projectController.createNewTask );

router.get('/:pid/tasks', strategyPolicies('current', ['USER']), projectController.getTasksFromProject)

export default router