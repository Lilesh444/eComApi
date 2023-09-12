// to manage routes/paths to product controllers

import express from "express";
import ProductController from "./productcontroller.js";
import {upload} from '../../middlewares/fileupload.js'
//2. initialize express router\
const router=express.Router();
// till this our request in browser alredy comes to localhost:3000/api/products -> now forward
const productscontroller=new ProductController();
router.get('/',productscontroller.getAllProduct);//here '/' means  localhost:3000/api/products/
router.post('/',upload.single('imageUrl'),productscontroller.addProduct);
router.get('/:id',productscontroller.getOneProduct);
// localhost:3000/api/products/filter?maxprice=10&minprice=25&catagory1
router.get('/filter',productscontroller.filterProducts) ;
router.post('/rate',productscontroller.rateProduct)



export default router;