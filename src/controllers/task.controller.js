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

const createNewTask = async(req, res)=>{
  try { 
    const {title, description, status, deadline, assignedTo} = req.body
   if(!title || !description || !status || !deadline){
    res.status(401).send({status:"error", error:"Incomplete values"})
   }
   if(status !== 'Unassigned' && !assignedTo){
    res.status(401).send({status:"error", error:"You must pick a user to assign this task"})
   }
   const projectId = req.params.pid
   if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).send({ status: "error", error: "Invalid project ID" });
}
    const project = await projectService.getProjectById(projectId)
    if(!project){
        return res.status(404).send({ status: "error", error: "Project not found" });
    }

   const newTask = {title, description, status, deadline, assignedTo, project:project};
   const taskResult = await taskService.createTask(newTask);

   project.tasks.push(taskResult._id); 
   await projectService.updateProject(projectId, project); 
   res.send({status:"succes", payload: result})

} catch(error){
    res.status(500).send({ status: "error", error: "Internal server error" })
    logger.warning(error);
}

}

export default{
    getAllTasks,
    createNewTask
}