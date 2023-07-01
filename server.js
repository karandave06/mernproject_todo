import {app} from './app.js';
import { config } from "dotenv";

config({
  path: "./data/file.env"
})

import { connectDB } from "./data/database.js";

connectDB();


app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);

  });
  