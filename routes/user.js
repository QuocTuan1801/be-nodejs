import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controller/auth';
import { userById } from '../controller/user';
const router = express.Router();
router.get('/user/secret/:userId',requireSignin, isAuth,isAdmin,(req,res)=>{
    res.json({user:req.profile})
})
router.param('userId', userById)
module.exports = router;