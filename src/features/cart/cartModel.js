export default class CartModel{
    constructor(productId,userId,quantity,id){
        this.id=id;
        this.userId=userId;
        this.productId=productId;
        this.quantity=quantity;
    }
    static getCart(){
        return cartItems;
    }
    static addCart(productId,userId,quantity){
        const cartItem=new CartModel(productId,userId,quantity);
        cartItem.id=cartItems.length+1;
        cartItems.push(cartItem);
        return cartItem;
    }
    static get(userId){
        return cartItems.filter(i=>i.userId==userId)
    }
     deleteCart(cartItemId, userId) {
        const cartItemIndex = cartItems.findIndex(c => c.id === cartItemId && c.userId === userId);
        console.log("Deleting cart item for userId:", userId, "and cartId:", cartId);
        if (cartItemIndex === -1) {
            throw new Error("Item not found");
        } else {
            cartItems.splice(cartItemIndex, 1);
        }
    }
    
}
const cartItems=[
    new CartModel(1,2,1,1),
    new CartModel(1,1,2,2)
]