import { logger } from "../utils/errors/logger.js";

export const executePolicies = (policies) =>{
   return(req, res, next)=>{
    if(policies.includes('PUBLIC')) return next();

    if(policies.includes('AUTHORIZED') && !req.user){
        return res.status(401).send("UNAUTHORIZED")
    }
    if(req.user){
        const userRole = req.user.role ? req.user.role.toUpperCase() : null
        if((userRole) && policies.includes(userRole)){
            return next()
        }
       

    }
    return res.status(403).send("FORBIDDEN");
   }

  
}
/*export const executePolicies = (policies) => {
    return (req, res, next) => {
        // Permitir acceso si las políticas incluyen 'PUBLIC'
        if (policies.includes('PUBLIC')) return next();

        // Si se requiere autorización pero no hay usuario, denegar acceso
        if (policies.includes('AUTHORIZED') && !req.user) {
            return res.status(401).send("UNAUTHORIZED");
        }

        // Comprobar si el usuario está definido y su rol
        if (req.user) {
            const userRole = req.user.role ? req.user.role.toUpperCase() : null; // Asegúrate de que `role` esté definido

            // Si el rol del usuario está en las políticas, permitir acceso
            if (userRole && policies.includes(userRole)) {
                return next();
            }
        }

        // Si no se cumplen las condiciones anteriores, denegar acceso
        return res.status(403).send("FORBIDDEN");
    }
}
 */