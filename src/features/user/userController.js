import UserModel from "./userModel.js";
import  Jwt  from "jsonwebtoken";
export default class UserController{
    async SignUp(req,res){
        const {name,email,password,type}=req.body;
        const newuser= await UserModel.signUp(name,email,password,type);
        res.status(201).send(newuser)
    }
    SignIn(req,res){
       const result= UserModel.signIn(req.body.email,req.body.password);
        if(!result){
            return res.status(400).send('Incorrect Credentials')
        }else{
            //here when logging in create a token and send it to the client
            const token=Jwt.sign({
                userId:result.id,
                email:result.email
            },
            "9e5mwXmL0I",
            {
                expiresIn:'1h'
            });
        res.status(200).send(token);
        }
    }
}