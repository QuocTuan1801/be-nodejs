import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {readdirSync} from 'fs';

require('dotenv').config();

//connect database
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{console.log('succes');})
.catch(()=>{console.log("error");})
const app = express();

//middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors())
// app.use(cors({ credentials: 'same-origin' }));

//routes
readdirSync('./routes').map(route => app.use('/api',require(`./routes/${route}`)))
const port = process.env.PORT || 8000
app.listen(port, () => {console.log('server is running port',port);})