import { logger } from "../utils/errors/logger.js";
import ProjectModel from "./models/project.model.js";

export default class ProjectDAO{
    async getProjects(){
        return ProjectModel.find()
    }
    async getProjectById(id){
        return ProjectModel.findById(id)
    }
    async createProject(project){
        return ProjectModel.create(project)
    }
    async updateProject(id, info){
        return ProjectModel.findByIdAndUpdate(id, info)
    }
    async deleteProject(id){
        return ProjectModel.findByIdAndDelete(id)
    }
    async addTaskToProject(id, task){
        try {
            if(!task){
                logger.info("In ProjectDAO.js: Please add task");
                return;
            }
           // await this.updateProject(id, task,{new:true}).populate('task')
           const project = await ProjectModel.findById(id);
           if (!project) {
               logger.error(`Project with id ${id} not found`);
               return;
           }

           project.tasks.push(task);
           await project.save();

           return ProjectModel.findById(id).populate('Task');
           
        } catch (error) {
            logger.error(`Error adding task to project: ${error.message}`);
        }
    }
}