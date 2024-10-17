import UserModel from "./models/user.model.js";

export default class UserDAO{
    async getUsers(){
        return UserModel.find()
    }
    async getUserById(id){
        return UserModel.findById(id)
    }
    async getUserByEmail(userEmail){
        return UserModel.findOne({email:userEmail})
    }
    async createUser(user){
        return UserModel.create(user)
    }
    async updateUser(id, info){
        return UserModel.findByIdAndUpdate(id, info, {new:true})
    }
    async deleteUser(id){
        return UserModel.findByIdAndDelete(id)
    }
}