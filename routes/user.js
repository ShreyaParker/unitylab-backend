import {Router} from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router()

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username, userType: user.type }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/register",async (req,res)=>{
    try {
        const {username,password,type} = req.body
        const hashedPass = await bcrypt.hash(password,10)
        const user = new User({username,password:hashedPass,type})
        await user.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e){
        res.status(500).json({error:e.message})
    }
})

export default router