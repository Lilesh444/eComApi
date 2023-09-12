import express from "express";
import CartController from "./cartController.js";
//2. initialize express router\
const cartRouter=express.Router();
const cartController=new CartController();
 cartRouter.post('/',cartController.add);
 cartRouter.get('/',cartController.get)
 cartRouter.delete('/:id',cartController.deleteCartItem)   
 export default cartRouter;