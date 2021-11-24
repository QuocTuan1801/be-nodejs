import express from 'express';
const router = express.Router();
import {list,read,update,create,remove} from '../controller/categories'

router.get('/categories',list);
router.get('/categories/:id',read)
router.patch('/categories/:id',update)
router.post('/categories', create)
router.delete('/categories/:id',remove)

module.exports = router;