import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup=async (req,res)=>{
    const {username,email,password}=req.body;

    if(!username||!email||!password||username===''||email===''||password===''){
        return res.status(400).json({message:"all fields required"})
    }

    const hashpass=bcryptjs.hashSync(password,10);

    const newuser=new User({
        username,
        email,
        password:hashpass,
    })

    try{
    await newuser.save();
    res.json({message:"signup successful"})
    }catch(err){
    res.status(500).json({message:err.message})
    }
};
    