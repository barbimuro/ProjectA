import passport from "passport";
import local from 'passport-local';
import {Strategy as GitHubStrategy} from 'passport-github2';
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import UserDAO from "../db/UserDAO.js";
import AuthService from "../services/AuthService.js";
import config from "./config.js";
import { logger } from "../utils/errors/logger.js";

const LocalStrategy = local.Strategy;
const authService = new AuthService();
const userService = new UserDAO();

const initializePassportConfig = () =>{
    passport.use('register', new LocalStrategy({usernameField:'email', passReqToCallback:true}, async(req, email, password, done)=>{
        const {firstName, lastName} =  req.body;
        if(!firstName || !lastName){
            return done(null, false, {message:"Incomplete values"})
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
        logger.info("At passport.config.js on register:", newUser)
        return done(null, result)
       
    }))
    passport.use('login', new LocalStrategy({usernameField:'email', passReqToCallback:true}, async(req, email, password, done )=>{
        const user = await userService.getUserByEmail(email)
        console.log(user)
       
       const maxAttempts = 4;
       const lockTime = 2 * 60 * 1000; 

        if(!user){
            return done(null, false, {message:"Incorrect credentials"})
        }
        const isValidPassword = await authService.validatePassword(password, user.password)

        if(user.lockUntil && user.lockUntil > Date.now()){
            return done(null, false, {message:"Account is locked, please try again later"})
        }

        if (user.password === 'GitHubUser' || user.password === null) {
            return done(null, false, {message: 'Please login using your github account.'});
            }

        if(!isValidPassword){
            user.loginAttempts = (user.loginAttempts || 0) +1;
            if(user.loginAttempts >=  maxAttempts){
                user.lockUntil = Date.now()+ lockTime
            }
            await userService.updateUser(user)
            return done(null, false, {message:"Incorrect credentials"})
        }

        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await userService.updateUser(user)
        
        return done(null, user)
    }))
    passport.use('github', new GitHubStrategy({
        clientID: config.auth.github.CLIENT_ID,
        clientSecret: config.auth.github.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async(token, refreshToken, profile, done)=>{
        logger.info(profile)
        const userInfo = profile._json
        if(!userInfo){
            return done(null, false, {message:"Error login"})
        }
       try{ const user = await userService.getUserByEmail(userInfo.email)
        if(user){
            return done(null, user._id)
        }
        const newUser = {
            firstName: userInfo.name.split(' ')[0],
            lastName: userInfo.name.split(' ')[1]||' ',
            password: 'GitHubUser',
            email: userInfo.email
        }
        const result = await userService.createUser(newUser)
        return done(null, result)}  catch (error) {
            logger.error("Error fetching user: ", error);
            return done(null, false, { message: "Internal server error" });
        }
    }))
    passport.use('current', new JWTStrategy({
        secretOrKey: config.auth.jwt.SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
    }, async(payload, done)=>{
            if (payload) {
        return done(null, payload); 
    } else {
        return done(null, false);
    }
    }))
    function cookieExtractor(req) {
       return req?.cookies?.[config.auth.jwt.COOKIE]
    }
}
export default initializePassportConfig