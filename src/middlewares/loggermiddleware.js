// import fs from 'fs';

// const fsPromise=fs.promises;

// async function log(logData){
//     try {
//         const logEntry=`\n ${new Date().toString()+".LogData:"+logData}`;
//         await fsPromise.appendFile("log.txt",logEntry)
//     } catch (error) {
//         console.log(error);
//     }
// }

// const loggerMiddleware=async (req,res,next)=>{
//    if(!req.url.includes('signin')){
//     const logData=`${JSON.stringify(req.url)}--${JSON.stringify(req.body)}`
//     await log(logData);
// }
//     next()
// }
// export default loggerMiddleware;

// USING WINSTON LOGGER LIBRARY
import winston from 'winston';
import fs from 'fs'; // Import the 'fs' module
const fsPromise = fs.promises;

const logger = winston.createLogger(
  {
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-login' },
    transports: [
      new winston.transports.File({ filename: 'logs.txt' })
    ]
  }
);

const loggermiddleware = async (req, res, next) => {
    console.log('Logger Middleware called'); // Add this line
    // if (!req.url.includes('signin')) {
      const logData = `${JSON.stringify(req.url)}--${JSON.stringify(req.body)}`;
      logger.info(logData);
    // }
    next();
  }
  

export default loggermiddleware;
