import mongoose from "mongoose";

const collection = "Project"

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    creationDate:{
        type:Date,
        default: Date.now
    },
    dueDate:{
        type: Date,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }
})
const ProjectModel = mongoose.model(collection,schema);
export default ProjectModel