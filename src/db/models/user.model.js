import mongoose from "mongoose";

const collection = "User"

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        enum:['user', 'admin'],
        default:'user'
    }
})

const UserModel = mongoose.model(collection, schema)
export default UserModel