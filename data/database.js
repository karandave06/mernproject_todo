import mongoose from "mongoose";
import {config} from 'dotenv'
config({
    path : "./file.env"
})
export const connectDB = () =>{

    mongoose.connect(process.env.MONGO_URL,{
        dbName: "backendapi",
      
        
    })
    .then((c) => console.log(`db connected ${c.connection.host}`))
    .catch((e) => console.log(e));
}