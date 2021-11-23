import express from 'express';
const router = express.Router();
import {list, read, update, create , remove} from '../controller/products'

router.get('/product',list);
router.get('/product/:slug',read)
router.patch('/product/:slug',update)
router.post('/product',create)
router.delete('/product/:slug',remove)
module.exports = router;