import express from 'express';
const router = express.Router();
import {list,read,update,create,remove} from '../controller/categories'

router.get('/categories',list);
router.get('/categories/:slug',read)
router.patch('/categories/:slug',update)
router.post('/categories', create)
router.delete('/categories/:slug',remove)

module.exports = router;