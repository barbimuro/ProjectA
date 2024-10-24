import mongoose from 'mongoose';
import ProjectDAO from '../db/ProjectDAO.js';

const projectService = new ProjectDAO()

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


export default {
    getAllProjects,
    createNewProject,
    getProjectById
}