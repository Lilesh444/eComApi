import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/ecomdb";
let client;

export const connetToMongoDB=async ()=>{
    MongoClient.connect(url)
.then(clientInstance=>{
    client=clientInstance;
    console.log('Connected to MongoDB')
}).catch(error=>{
    console.log(error)
})
}
export const getDB=()=>{
    return client.db();
}