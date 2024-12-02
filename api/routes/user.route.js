import express from 'express';
import {deleteUser, test} from '../controllers/user.controller.js';
import { updateUser , signout} from '../controllers/user.controller.js';
import { verifyToken } from '../util/verifyUser.js';

const router=express.Router();

router.get("/test",test);
router.put("/update/:userId",verifyToken,updateUser);
router.delete("/delete/:userId",verifyToken,deleteUser);
router.post("/signout",verifyToken,signout);

export default router;