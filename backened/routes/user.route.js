import express from 'express';
const router=express.Router();
import { register,login ,logout,getMyProfile, getAdmins} from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);
router.get("/my-profile",getMyProfile);
router.get("/admins",getAdmins)
export default router;