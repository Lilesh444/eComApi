import ProductModel from "./productmodel.js";
export default class ProductController{
    getAllProduct(req,res){
       const products=ProductModel.getProducts();
       res.status(200).send(products)
    }

    addProduct(req, res){
        const {name, price, sizes} = req.body;
        const newProduct = {
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl:'uploads/'+ req.file.filename,
        };
        const createdRecord=ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    rateProduct(req,res){
        const userId=req.query.userId;
        const productId=req.query.productId;
        const rating=req.query.rating;
        // in normal way
        // const error=ProductModel.rateProduct(userId,productId,rating)
        // if(error){
        //     return res.status(400).send(error)
        // }else{
        //     return res.status(200).send('Rating has been added');
        // }
        // IN TRY CATCH WAY
        try {
            ProductModel.rateProduct(userId,productId,rating)
        } catch (error) {
            return res.status(400).send(error.message)
        }      
            return res.status(200).send('Rating has been added');
    }

    getOneProduct(req,res){
        const id=req.params.id;
        const product=ProductModel.getById(id);
        if(!product){
            res.status(404).send('product not found')
        }else{
            return res.status(200).send(product);
        }
    }
   
    filterProducts(req, res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);
    }

}