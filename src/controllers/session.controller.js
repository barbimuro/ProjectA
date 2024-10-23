import jwt from 'jsonwebtoken';

import UserDTOSession from "../DTO/UserParsed.js";
import config from '../config/config.js';
import { logger } from '../utils/errors/logger.js';
import authService from '../services/AuthService.js'




const passportRegister = async (req, res) => {
    try {
        // Verificar si el usuario existe en req.user
        const user = req.user;

        if (!user) {
            // Si no hay usuario, enviar una respuesta de error
            return res.status(400).json({ error: 'Registro fallido, no se pudo crear el usuario o ya existe.' });
        }

        // Crear el objeto userSession para generar el token JWT
        const userSession = {
            id: user._id,
            name: user.name,
            role: user.role
        };

        // Generar el token JWT
        const userToken = await jwt.sign(userSession, config.auth.jwt.SECRET, { expiresIn: "1d" });

        // Log para verificar que el token se esté generando correctamente
        logger.info('At session.controller.js, on passportRegister: Setting cookie with token:', userToken);
        res.cookie(config.auth.jwt.COOKIE, userToken, { httpOnly: true });
        return res.status(201).json({ message: 'Usuario registrado y autenticado', token: userToken });

    } catch (err) {  
        logger.error('Error en passportRegister:', err);
        return res.status(500).json({ error: 'Ocurrió un error interno en el servidor' });
    }
};

const regularRegister = async (req, res)=>{
   try {
    const {firstName, lastName, email, password} =  req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).send({ status: "error", error: "Incomplete values" });
    }
    const user = await userService.getUserByEmail(email);
    if(user){
        return done(null, false, {message:"User already exists"})
    }
    const hashedPassword = await authService.hashPassword(password)
    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'user'
    }
    const result = await userService.createUser(newUser);
    /* const userSession = {
            id: user._id,
            name: user.name,
            role: user.role
        };

        // Generar el token JWT
        const userToken = await jwt.sign(userSession, config.auth.jwt.SECRET, { expiresIn: "1d" });

        // Log para verificar que el token se esté generando correctamente
        logger.info('At session.controller.js, on regularRegister: Setting cookie with token:', userToken);
        res.cookie(config.auth.jwt.COOKIE, userToken, { httpOnly: true });
        return res.status(201).json({ message: 'Usuario registrado y autenticado', token: userToken });*/
    logger.info("At session.controller.js, on regularRegister:",newUser)
    res.send({ status: "success", payload: result._id });} catch(error){

    }
}


const passportLogin = async(req, res)=>{
    const user = req.user
    logger.info("At session.controller.js, on passportLogin:",user)
    const sessionUser = new UserDTOSession(user);

    const sessionUserObject = {...sessionUser}

    console.log(sessionUserObject)

    const userToken = await jwt.sign(sessionUserObject, config.auth.jwt.SECRET, {expiresIn:"1d"});
    logger.info(`At session.controller.js, on passportLogin: Setting cookie with token: ${userToken}`)
    res.cookie(config.auth.jwt.COOKIE, userToken, {httpOnly:true}).redirect('/profile')
}

const passportGitHubCallback = async(req, res)=>{
    const userSession = {
        id: req.user._id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        role: req.user.role
    };
    const userToken = await jwt.sign(userSession, config.auth.jwt.SECRET, {expiresIn: "1d"});
    logger.info('At session.controller.js, on passportGitHubCallback: Setting cookie with token:', userToken)
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

const logout = async(req, res)=>{
    res.clearCookie(config.auth.jwt.COOKIE).redirect('/login')
}

const failureLogin = async(req, res)=>{
    res.send({ status: "error", error: "Failed login attempts" });
}

const failureRegister = async(req, res)=>{
    res.send({ status: "error", error: "Failed register attempts" });
}

export default {
    passportRegister, 
    regularRegister,
    passportLogin, 
    passportGitHubCallback, 
    passportCallCurrent,
    logout,
    failureLogin,
    failureRegister
}