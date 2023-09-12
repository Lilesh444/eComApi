import CartModel from "./cartModel.js";
export default class CartController{
    add(req,res){
        const  {productId,quantity}=req.query;
        const userId=req.userId;
        CartModel.addCart(userId,quantity,productId);
        return res.status(201).send('Cart updated');
    }

    get(req,res){
        const userId=req.userId;
        const items=CartModel.get(userId)
        return res.status(200).send(items);
    }
    deleteCartItem(req, res) {
        const userId = req.userId;
        const cartId = req.params.id;
        console.log("Deleting cart item for userId:", userId, "and cartId:", cartId);
        try {
            // Assuming CartModel.deleteCart() throws an error if the item is not found
            CartModel.deleteCart(cartId, userId);
            res.status(200).send('Cart item deleted');
        } catch (error) {
            // Handle the error appropriately
            res.status(400).send(error); // Use a more appropriate status code and provide an error message
        }
    }
    
}