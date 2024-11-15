import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userrouter from './routes/user.route.js';
import authrouter from './routes/auth.route.js';


dotenv.config();
mongoose
    .connect(process.env.MONGO)
        .then(
    ()=>{
        console.log('mongo connection made');
    }    
).catch((err)=>{
    console.log(err)
})

const app=express();
app.listen(3000,()=>{
    console.log('server running on port 3000')
});

app.use(express.json());

app.use('/api/user' , userrouter); 
app.use('/api/auth', authrouter);

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode||500;
    const message=err.message||"internal server error";
    res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })
})