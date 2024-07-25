import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import userrouter from './routes/userRoutes.js'
import taskrouter from "./routes/taskRoutes.js";
dotenv.config();
import cors from 'cors'
import './db.js';
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;
app.use('/users',userrouter)
app.use('/tasks',taskrouter)
app.get('/',(req,res) => {
    res.json({
        message: "Task Manager API is working!"
    })
})

app.listen(PORT, () => {
    console.log(`server starting on ${PORT}`)
})