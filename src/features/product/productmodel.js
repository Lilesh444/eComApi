import UserModel from "../user/userModel.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class ProductModel{
    constructor(id,name,desc,price,imageUrl,catagory,sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.catagory=catagory;
        this.sizes=sizes;
    }
    static getProducts(){
        return products;
    }
    static add(product){
        product.id=products.length+1;
        products.push(product);
        return product;
    }
    static getById(id){
        const product=products.find(p=>p.id==Number(id));
        return product;
    }
    static filter(minPrice, maxPrice, category){
        const result = products.filter((product)=>{
          return(
          (!minPrice || 
            product.price >= parseFloat(minPrice)) &&
          (!maxPrice || 
            product.price <= parseFloat(maxPrice)) &&
          (!category || 
            product.category === parseFloat(category))
          );
        });
        return result;
      }
      static rateProduct(userId,productId,rating){
        //1. validate user and product
        const user=UserModel.getAll().find(u=>u.id==userId);
        if(!user){
          throw new ApplicationError( 'user not found',404)
        }
        //2. now validate product
        const product=products.find(p=>p.id==productId);
        if(!product){
          throw  new ApplicationError('Product not found',400 )
        }
        //3. now check if any previous rating present or not , if not add rating array
        if(!product.rating){
          product.rating=[];
          product.rating.push({
            userId:userId,
            rating:rating
          })
        }else{
          // check if rating already present
          const existingRatingIndex=product.rating.findIndex(r=>r.userId==userId)
          if(existingRatingIndex>=0){
            product.rating[existingRatingIndex]={
              userId:userId,
              rating:rating
            }
          }else{
            product.rating.push({
              userId:userId,
              rating:rating
            })
          }
        } 
      }
  
}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Cateogory1'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Cateogory2',
    ['M', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Cateogory3',
    ['M', 'XL','S']
  )];
