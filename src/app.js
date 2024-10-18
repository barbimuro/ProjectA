import express from "express";
import passport from "passport";
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from "cookie-parser";

import {addLogger, logger} from "./utils/errors/logger.js";
import config from "./config/config.js";
import initializePassportConfig from './config/passport.config.js'

import userRouter from './routes/user.router.js'

const app =  express()

const PORT = config.app.PORT

 //we configure handlebars as a template engine
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('./src/public'));
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

initializePassportConfig()
app.use(passport.initialize())

app.use(addLogger)

const server = app.listen(PORT, ()=>logger.info(`Listening on port ${PORT}`))

const connectDB = mongoose.connect(config.mongo.URL)

app.use('/api/users', userRouter )