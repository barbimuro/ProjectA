import ProjectModel from "./models/user.model.js";

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
    async deleteUser(id){
        return ProjectModel.findByIdAndDelete(id)
    }
}