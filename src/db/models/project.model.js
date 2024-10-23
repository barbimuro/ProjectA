import mongoose from "mongoose";

const collection = "Project"

const schema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    fechaCreacion:{
        type:Date,
        default: Date.now()
    },
    fechaEntrega:{
        type: Date,
        require:true
    }
})
const ProjectModel = mongoose.model(collection,schema);
export default ProjectModel