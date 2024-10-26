import mongoose from 'mongoose';
import ProjectDAO from '../db/ProjectDAO.js';
import TaskDAO from '../db/TaskDAO.js';
import UserDAO from '../db/UserDAO.js';

const projectService = new ProjectDAO()
const taskService = new TaskDAO();
const userService = new UserDAO();

const getAllProjects = async(req, res)=>{
    const projects = await projectService.getProjects()
    const limit = 10;

    try {
        res.json(projects.slice(0, limit));
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const createNewProject = async(req, res)=>{
    try {
        const {name, description, dueDate } = req.body
        if(!name|| !description || !dueDate){
            res.status(401).send({status:"error", error:"Incomplete values"})
        }
        const author = req.user._id;
        const creationDate = Date.now()
        const newProject = {
            name, description, creationDate, dueDate, author
        }
        const result = await projectService.createProject(newProject)
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const getProjectById = async(req, res) =>{
    try {
        const projectId = req.params.pid 
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).send({ status: "error", error: "Invalid cart ID" });
        }
        const project = await projectService.getProjectById(projectId)
        if(!project){
            return res.status(404).send({status:"error", error:"Project not found"})
        }
        res.send({status:"success", payload: project})
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const createNewTask = async(req, res)=>{
    try { 
      const {title, description, status, deadline, assignedTo} = req.body
     if(!title || !description || !status || !deadline){
      return res.status(401).send({status:"error", error:"Incomplete values"})
     }
     if(status !== 'Unassigned' && !assignedTo){
      return res.status(401).send({status:"error", error:"You must pick a user to assign this task"})
     }
     if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
        return res.status(400).send({ status: "error", error: "Invalid user ID" });
    }
     const user = assignedTo ? await userService.getUserById(assignedTo): null;
     console.log(assignedTo)
        if(assignedTo && !user){
            return res.status(404).send({ status: "error", error: "User not found" });
        }
     const projectId = req.params.pid
     if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).send({ status: "error", error: "Invalid project ID" });
  }
      const project = await projectService.getProjectById(projectId)
      if(!project){
          return res.status(404).send({ status: "error", error: "Project not found" });
      }
  
     const newTask = {title, description, status, deadline, assignedTo: assignedTo ? user._id : null, project:projectId};
     const taskResult = await taskService.createTask(newTask);
  
    project.tasks.push(taskResult._id); 
    await projectService.updateProject(projectId, project); 
  
     return res.send({status:"success", payload: taskResult})
  
  } catch(error){
      return res.status(500).send({ status: "error", error: "Internal server error" })
  }
}

const getTasksFromProject = async(req, res)=>{
    try {
        const projectId = req.params.pid 
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).send({ status: "error", error: "Invalid cart ID" });
        }
        const project = await projectService.getProjectById(projectId)
        if(!project){
            return res.status(404).send({status:"error", error:"Project not found"})
        }
        const tasks = await taskService.getTaskByProject(projectId)

        return res.send(tasks)

    } catch (error) {
        return res.status(500).send({ status: "error", error: "Internal server error" })
    }
}


export default {
    getAllProjects,
    createNewProject,
    getProjectById, 
    createNewTask,
    getTasksFromProject
}