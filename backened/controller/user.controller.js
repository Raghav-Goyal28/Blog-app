import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenandAndSaveCookie from "../jwt/AuthToken.js"
export const register = async (req, res) => {
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({message: "user photo required"});
        }
        const {photo}=req.files;
        const allowedFormats=["image/jpeg","image/png","image/webp"];
        if(!allowedFormats.includes(photo.mimetype)){
            return res.status(400).json({message: "please fill reaq fields"});  
        }

        const { email, name, password, phone, education, role } = req.body;
        if(!email || !name || !password || !phone || !education || !role || !photo){
            return res.status(400).json({message: "please fill required fields"});
        }
        
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({message: "user alerady exist"});
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
          }

          const hashedpassword=await bcrypt.hash(password,10);
        const newUser=new User({ email, name, password:hashedpassword, phone, education, role,photo:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
        }});

        await newUser.save();
        
        if(newUser){
           const token= await createTokenandAndSaveCookie(newUser._id,res)
            return res.status(200).json({message: "succesfully register",newUser,token:token});
        }
    }
        catch(err){
            console.log(err);
            res.status(500).json({error:'Internal server error'});
    }
}

export const login=async(req,res)=>{
    const {email,password,role}=req.body;
    try{
if(!email || !password || !role){
    return res.status(400).json({message:"please fill req"});
}
const user = await User.findOne({ email }).select("+password");
  
    const isMatch=await bcrypt.compare(password,user.password);

    if(!user || !isMatch){
        return res.status(400).json({message: "inavalid"});
    }
    if(user.role!==role){
        return res.status(400).json({message: "inavalid"});
    }
    const token= await createTokenandAndSaveCookie(user._id,res);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: token,
      });
}
    
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
}

export const logout=(req,res)=>{
    try{
    res.clearCookie("jwt");
    res.status(200).json({message:'successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
}

export const getMyProfile = async (req, res) => {
    const user = await req.user;
    res.status(200).json({ user });
  };
  
  export const getAdmins = async (req, res) => {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
  };