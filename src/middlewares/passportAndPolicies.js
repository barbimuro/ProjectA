import { passportCall } from "./passportCall.js";
import { executePolicies } from "./policies.js";
import { logger } from "../utils/errors/logger.js";

const strategyPolicies = (strategy, role) =>{
    const passportStrategy = passportCall(strategy)
    const policiesMiddleware = executePolicies(role)

    if(!passportStrategy){
        logger.warning("All endpoints must have a strategy");
        return (req, res, next) => res.status(500).send("Server Error: No strategy defined.");
    }
    if(!policiesMiddleware){
        logger.warning("All endpoints must have policies");
        return (req, res, next) => res.status(500).send("Server Error: No policies defined.");
    }
    return[passportStrategy, policiesMiddleware]
}

export default strategyPolicies