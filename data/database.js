import mongoose from "mongoose";
import {config} from 'dotenv'
config({
    path : "./file.env"
})
export const connectDB = () =>{

    mongoose.connect(process.env.MONGO_URL,{
        dbName: "backendapi",
    })
    .then(() => console.log("db connected"))
    .catch((e) => console.log(e));
}