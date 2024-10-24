import passport from "passport";
import { logger } from "../utils/errors/logger.js";

export const passportCall = (strategy) =>{
    return async(req, res, next)=>{
        passport.authenticate(strategy, {session:false}, function(error, user, info){
            console.log('At passportCall.js: Authenticated user:', req.user); 
        if(error) return next(error)
        req.user = user 
        next()
        })(req, res,next)
    }
}
