import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import user from "./routes/user.js"

dotenv.config()
const app=  express()
app.use(bodyParser.json())

const MONGOURI = process.env.MONGOURI
const PORT = process.env.PORT
mongoose.connect(MONGOURI)
    .then(()=>console.log("connected"))


app.use("/api/auth", user);
app.listen(PORT,()=>{
    console.log("hello")

    }
)