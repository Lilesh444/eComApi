import  express from 'express';
import swagger, { serve } from 'swagger-ui-express';
import router  from './src/features/product/productroutes.js';
import Userrouter from './src/features/user/userRoutes.js';
import cartRouter from './src/features/cart/cartRoutes.js';
import bodyParser from 'body-parser';
import jwtAuth from './src/middlewares/jwtAuthMiddleware.js';
import apiDocs from './swagger.json ' assert {type:'json'};
import cors from 'cors';
import loggermiddleware from './src/middlewares/loggermiddleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connetToMongoDB} from './src/config/mongodb.js';

const server=express();

// CORS policy configuration
// server.use((req,res,next)=>{
//     res.header('Access-Controll-Allow-Origin','http://localhost:5500');
//     res.header('Access-Controll-Allow-Headers','*');//'Content-Type,Authorization
//     res.header('Access-Controll-Allow-Methods','*')

//     // need to return ok staus for preflight request
//     if(req.method=='OPTIONS'){
//         return res.sendStatus(200)
//     }
//     next()
// })
// with cors library
const corsOptions={
    origin:'http://localhost:5500',
    allowHeaders:'*',

}
server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

server.use('/api-docs',swagger.serve,swagger.setup(apiDocs))
server.use(loggermiddleware)
// for all request related to product , redirect to the produt routes
server.use('/api/products',jwtAuth,router);
server.use('/api/users',Userrouter);
server.use('/api/cartItems',jwtAuth,cartRouter);

// Error handelling in server
server.use((error,req,res,next)=>{
    console.log(error);
    if(error instanceof ApplicationError){
        res.status(error.code).send(error.message)
    }
    res.status(500).send("something went wrong, plz try later!!")
})
// 404 error not found
server.use((req,res)=>{
    res.status(404).send('404 Error , Api not found , plz check our documentation for more information localhost:3000/api-docs');
})


server.get('/',(req,res)=>{
    res.send('Welcome to E-com-Apis')
})

server.listen(3000,()=>{
    console.log('Api server running on : 3000');
    connetToMongoDB();
})