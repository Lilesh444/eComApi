import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this.id=id;
    }
    static async signUp(name, email, password, type) {
       try {
             //1. get the DB from config
        const db=getDB();
        //2.create user collection
        const collection=db.collection("users");
        const newUser = new UserModel(
          name,
          email,
          password,
          type
        );
        //3. insert the document
        await collection.insertOne(newUser);
        return newUser;
       } catch (error) {
        throw new ApplicationError('something went wrong',500)
       }
        // push without userDatabase
        // newUser.id=Users.length+1
        // Users.push(newUser);
    }
    
    static signIn(email,password){
        const ValidUser = Users.find(user =>
            user.email.toLowerCase() === email && user.password === password
        );
             return ValidUser;
    }
    static getAll(){
        return Users;
    }
}
const Users=[{

    "name":"Seller User",
    "email":"seller@ecom.com",
    "password":"password1",
    "type":"seller",
    "id":1
},
{
    "name":"Customer User",
    "email":"customer@ecom.com",
    "password":"password2",
    "type":"customer",
    "id":2
}]