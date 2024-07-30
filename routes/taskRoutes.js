import express from 'express';
import User from '../Models/Usermodel.js'
import auth from '../middleware/auth.js';
import Task from '../Models/Taskmodel.js';

const router = express.Router();

router.get('/test',auth, (req,res) => {
    res.json({
        message:"task route working fine",
        user: req.user
    })
})

//CRUD operation for task

//create a Task

router.post('/createtask',auth,async(req,res)=> {
    try {
        //we need description,completed from req.body
        //owner: req.user._id
        const task= new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).send({task,message:"task created successfully"})

    } catch (error) {
        res.status(400).send({error:error.message});
    }
})

//get user task

router.get('/getusertask',auth,async(req,res)=> {
    try {
       const  tasks=  await Task.find({
        owner: req.user._id
       })
        res.status(201).json({
            tasks,count:tasks.length,message:"Tasks fetched successfully"
        })
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

//get particular task of user

router.get('/:id',auth,async(req,res)=>{
    try {
        const tasks= await Task.findOne({
            owner:req.user._id,
            _id:req.params.id
        })
        if(!tasks){
            res.status(400).json({error:'task are not there'})
        }
        res.status(200).json({tasks,count:tasks.length,message:"particular task"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
    
})

//update the task

router.patch('/:id',auth,async(req,res)=> {
    const taskId= req.params.id;
    const updates= Object.keys(req.body);
    //for validate updated fields are valid or not, it only allow below field to update in a particular task
    const updatevalidatarray= ['description','completed'];
    
   const isvalidate= updates.every(update=> updatevalidatarray.includes(update))
   if(!isvalidate){
    res.status(400).json({error:'Invalid Updates'});

   }
   const task= await Task.findOne({
    _id: taskId,
    owner: req.user._id
   }) 
   if(!task){
    res.json({message:"task not find"})
   }

   updates.forEach(update=> task[update]= req.body[update])
   await task.save();
   res.json({
    message:"Task updated successfully"
   })

})

//to delete a particular task

router.delete('/:id',auth,async(req,res)=> {
    const taskId= req.params.id;
    const task= await Task.findOne({
        _id: taskId,
        owner:req.user._id
    })

    if(!task){
        res.status(400).json({error:"task not find"});
    }
    await Task.deleteOne({
        _id: taskId
    })
    res.status(200).json({message:"task deleted Successfully"})
})


export default router;