import {Router} from "express";
import Catalog from '../models/Catalog.js';
import User from "../models/user.js";
import {verifyToken} from "../middleware/auth.js";

const router = Router()

router.use(verifyToken)

router.get("/seller-catalog/:sellerId",async (req,res)=>{
    try {
        const {  userType } = req.user;


        if (userType === 'buyer') {
            const sellerId = req.params.sellerId;

            const catalog = await Catalog.findOne({seller: sellerId}).populate('products', 'name price');

            res.status(200).json({catalog});
        } else {

            res.status(403).json({ message: 'Access forbidden. User is not a buyer.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.get('/list-of-sellers', async (req, res) => {
    try {

        const { userType } = req.user;


        if (userType === 'buyer') {
            const sellers = await User.find({ type: 'seller' }, 'username');


            res.status(200).json({ sellers });
        } else {

            res.status(403).json({ message: 'Access forbidden. User is not a buyer.' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});
export default router