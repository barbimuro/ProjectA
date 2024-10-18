import jwt from 'jsonwebtoken';

import UserDTOSession from "../DTO/UserParsed.js";
import config from '../config/config.js';
import { logger } from '../utils/errors/logger.js';




const passportRegister = async(req, res)=>{
    const user = req.user
    const userSession = {
        id: user._id,
        name: user.name,
        role: user.role
    }
    const userToken = await jwt.sign(userSession, config.auth.jwt.SECRET, {expiresIn: "1d"});
    logger.info('Setting cookie with token:', userToken)
    res.cookie(config.auth.jwt.COOKIE, userToken, {httpOnly:true})//.redirect('/profile)
}
const passportLogin = async(req, res)=>{
    const sessionUser = new UserDTOSession(req.user);

    const sessionUserObject = {...sessionUser}

    const userToken = await jwt.sign(sessionUserObject, config.auth.jwt.SECRET, {expiresIn:"1d"});
    logger.info('Setting cookie with token:', userToken)
    res.cookie(config.auth.jwt.COOKIE, userToken, {httpOnly:true})//.redirect('/profile)
}

const passportGitHubCallback = async(req, res)=>{
    const userSession = {
        id: req.user._id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        role: req.user.role
    };
    const userToken = await jwt.sign(userSession, config.auth.jwt.SECRET, {expiresIn: "1d"});
    logger.info('Setting cookie with token:', userToken)
    res.cookie(config.auth.jwt.COOKIE, userToken)//.redirect('/profile)
}
const passportCallCurrent = async(req, res)=>{
    const token = req.cookies[config.auth.jwt.COOKIE];

    if(!token){
        return res.status(401).send({status:"Error", error:"Please log in"})
    }
    try {
        const user = await jwt.verify(token, config.auth.jwt.SECRET);
        res.send(user)
    } catch (error) {
        logger.warning("Token verification error", error);
        res.status(401).send({status:"Error", error:"InvalidToken"})
    }
}

export default {
    passportRegister, 
    passportLogin, 
    passportGitHubCallback, 
    passportCallCurrent}