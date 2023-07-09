const mongoose=require("mongoose");


//route handler
const taskSchema=new mongoose.Schema({
	title:{type:String,required:true},
    description:{type:String},
    dueDate:{type:String},
    status:{type:String},
    assignedUser:{type:String},

}
);
module.exports=mongoose.model("task",taskSchema);