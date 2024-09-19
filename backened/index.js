import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
    import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js"

import cors from "cors"
const app = express();
dotenv.config();

const port=process.env.PORT;
const MONOGO_URL = process.env.MONOG_URI;

import bodyParser from "body-parser";
app.use(bodyParser.json());//req.body
app.use(cookieParser());





app.use(cors({
  origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
//midleware
//app.use(express.json())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))

// DB Code
try {
    mongoose.connect(MONOGO_URL);
    console.log("Conntected to MonogDB");
  } catch (error) {
    console.log(error);
  }

// define routes
app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute);
//cloudinary
 
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY , 
        api_secret:   process.env.CLOUD_SECRET_KEY// Click 'View API Keys' above to copy your API secret

}); 

app.listen(port,()=>{
console.log(`server running on  ${port}`)
})