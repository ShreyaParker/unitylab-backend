import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const app=  express()
app.use(bodyParser.json())

const MONGOURI = process.env.MONGOURI
const PORT = process.env.PORT
mongoose.connect(MONGOURI)
    .then(()=>console.log("connected"))
app.listen(PORT,()=>{
    console.log("hello")

    }
)