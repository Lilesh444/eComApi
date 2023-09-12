import express from "express";
import UserController from "./userController.js";

const Userrouter=express.Router();

const usersController=new UserController();

Userrouter.post('/signup',usersController.SignUp);
Userrouter.post('/signin',usersController.SignIn);


export default Userrouter;

