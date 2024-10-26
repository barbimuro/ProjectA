import TaskModel from "./models/task.model.js";

export default class TaskDAO{
    async getTasks(){
        return TaskModel.find()
    }
    async getTaskById(id){
        return TaskModel.findById(id)
    }
    async createTask(task){
        return TaskModel.create(task)
    }
    async updateTask(id, info){
        return TaskModel.findByIdAndUpdate(id, info)
    }
    async deleteTask(id){
        return TaskModel.findByIdAndDelete(id)
    }
    async getTaskByProject(projectId){
        return TaskModel.find({project:projectId})
    }
}