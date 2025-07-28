import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" })

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("Express error "+err);
    })
    app.listen(process.env.PORT || 3000,()=>{
        console.log("server up and running at port "+process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
});