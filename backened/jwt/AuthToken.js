import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const createTokenandAndSaveCookie=async(userId,res)=>{

const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
    expiresIn:"7d"
})

res.cookie("jwt",token,{
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    path: "/", // Ensure the cookie is available throughout the site
})

await User.findByIdAndUpdate(userId,{token});
return token;
}

export default createTokenandAndSaveCookie;