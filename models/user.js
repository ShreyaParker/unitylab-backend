import {model, Schema} from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['buyer', 'seller'], required: true },
})

const User = model("user",userSchema)


export default User