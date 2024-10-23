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

export default {
    getAllProjects,
    createNewProject
}