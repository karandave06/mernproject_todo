import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: String,
    title: {
      type: String,
      required: true,
    },
  
    drisciption: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    isComplated: {
      type: Boolean,
      default: false,
    },
    
    createdAt: {
      type:Date,
      default: Date.now,
    }
  });
export const Task = mongoose.model("Task", schema);
  