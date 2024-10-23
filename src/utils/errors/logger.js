import winston from 'winston';

//We declare the log levels
const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}
// Winston logic
const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({
                    colors: customLevelOptions.colors
                }),
                winston.format.simple()
            )})
    ]
})
const addLogger=(req, res, next)=>{
req.logger=logger
req.logger.info(`On logger.js: ${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
next()
}

export  {logger, addLogger};