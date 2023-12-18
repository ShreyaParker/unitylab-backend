import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import user from "./routes/user.js"
import catalog from "./routes/catalog.js";

dotenv.config()
const app=  express()
app.use(bodyParser.json())

const MONGOURI = process.env.MONGOURI
const PORT = process.env.PORT
mongoose.connect(MONGOURI)
    .then(()=>console.log("connected"))


app.use("/api/auth", user);
app.use("/api/seller", catalog);

app.listen(PORT,()=>{
    console.log("hello")

    }
)