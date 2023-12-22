import {Router} from "express";
import Catalog from '../models/Catalog.js';
import User from "../models/user.js";
import {verifyToken} from "../middleware/auth.js";
import Product from '../models/Product.js';
import Order from "../models/order.js";


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

router.post("/create-order/:sellerId",async (req, res)=>{
    try {
        const sellerId = req.params.sellerId;
        const { items } = req.body;
        const buyerId = req.user.userId;

        const seller = await Catalog.findOne({seller:sellerId})

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid items array in the request' });
        }

        const productIds = [];

        for (const item of items) {
            const { productId, quantity } = item;

            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found` });
            }

            const isInCatalog = await Catalog.exists({ seller: sellerId, products: productId });

            if (!isInCatalog) {
                return res
                    .status(400)
                    .json({ message: `Product with ID ${productId} does not belong to the seller's catalog` });
            }

            productIds.push({ product: productId, quantity });
        }

        const order = new Order({
            buyer: buyerId,
            seller: sellerId,
            items: productIds,
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
export default router