import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../util/error.js';
import jwt from 'jsonwebtoken';

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

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password || email=='' || password==''){
        return next(errorhandler(400,'all fields required'));
    }
    try{
        const validUser=await User.findOne({email});
        if(!validUser){
            next(errorhandler(400,'invalid email'));
        }
        const validPass=bcryptjs.compareSync(password,validUser.password);
        if(!validPass){
            return next(errorhandler(400,'invalid password'));
        }
        const token=jwt.sign(
            {
                id:validUser._id,
            },
            process.env.JWT_SECRET_KEY
        )
        const { password : pass , ...rest}=validUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json({
            success:true,
            user:rest,
        });
    }
    
    catch(error){
        throw error;
    }
};
    