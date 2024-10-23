import projectController from "../controllers/project.controller.js";
import {Router} from 'express';

const router = Router()

router.get('/', projectController.getAllProjects)

export default router