import express from 'express';
const router = express.Router();
import {list, read, update, create , remove} from '../controller/products'

router.get('/product',list);
router.get('/product/:id',read)
router.patch('/product/:id',update)
router.post('/product',create)
router.delete('/product/:id',remove)
module.exports = router;