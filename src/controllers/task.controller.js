import TaskDAO from "../db/TaskDAO.js";
import ProjectDAO from "../db/ProjectDAO.js";
import { logger } from "../utils/errors/logger.js";

const taskService = new TaskDAO()
const projectService = new ProjectDAO()

const getAllTasks = async(req, res)=>{
    const Tasks = await taskService.getTasks()
    try {
        res.send({status:"success", payload: Tasks})
    } catch (error) {
        
    }
}


//http://localhost:8080/api/tasks/671d0878ea9701848ee73237/createTask
//http://localhost:8080/api/projects/671d0878ea9701848ee73237/tasks

export default{
    getAllTasks
}