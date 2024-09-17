import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../util/error.js';

export const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;

    if(!username||!email||!password||username===''||email===''||password===''){
        next(errorhandler(400,"all fields required"))
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
    next(err)
    }
};
    