import mongoose from "mongoose";

const collection = "Task"

const schema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    status:{
        type: String,
        enum:['Unassigned','Assigned','In process','Late','Delivered','Returned'],
        required: true,
        default:'Unassigned'
    },
    deadline:{
        type: Date,
        required: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
    },
    project:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Project',
    }
})

const TaskModel = mongoose.model(collection, schema)

export default TaskModel