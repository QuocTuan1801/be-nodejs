import express from 'express';
const router = express.Router();
import { signin, signup } from '../controller/auth';
router.post('/signup',signup)
router.post('/signin',signin)
module.exports = router;