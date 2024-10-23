import passport from "passport";

export const passportCall = (strategy) =>{
    return async(req, res, next)=>{
        passport.authenticate(strategy, {session:false}, function(error, user, info){
            console.log('At passportCall.js: Authenticated user:', req.user); 
        if(error) return next(error)
        req.user = user || null
        next()
        })(req, res,next)
    }
}