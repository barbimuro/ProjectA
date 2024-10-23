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

export default {
    getAllProjects
}