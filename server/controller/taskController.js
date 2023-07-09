


const taskModel = require("../models/taskModel");

const userModel = require("../models/userModel");






exports.saveTask=async(req,res)=>{
    try {
        console.log(req.body)
         const ids=await taskModel.create(req.body)
        return res.status(201).json({
            success:true,
            message:'task created',
            ids})
        
    } catch (error) {
        console.log(error)
        console.log('error occured in save controller')
    }
}
exports.updateTask=async(req,res)=>{
    try {
        console.log(req.params)
        console.log(req.body)
        const id=req.params.id
        const{status}=req.body
      
         const ids=await taskModel.findByIdAndUpdate({_id:id},{status:status},{new:true})
        console.log(ids)
        return res.status(201).json({
            success:true,
            message:'status updated'
         })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'error occured in updating status'
         })
    }
}
exports.allTask=async(req,res)=>{
    try {
        const tasks=await taskModel.find()
        if(tasks==[]){
           return res.status(400).json({
                success:false,
                message:'no message in available'
            })
        }else{
           return res.status(200).json({
                success:true,
                tasks
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:'error occur in getting tasks'
        })
    }
}
exports.generateOrderId=async(req,res)=>{
    try {
        const tasks=await messageModel.find()
        let text =tasks.length.toString();
        text = text.padStart(3,"0");
          let oid="XB"+text
            
         return res.status(200).json({
                success:true,
                orderId:oid
            })
        
         
        

    } catch (error) {
        console.log(error)
        console.log('error occured in geting id')
    }
}



