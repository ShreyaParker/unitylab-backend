import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Catalog from '../models/Catalog.js';
import Product from '../models/Product.js';

const router = express.Router();

router.use(verifyToken);

router.post('/create-catalog', async (req, res) => {
    try {
        const { userId, userType } = req.user;

        if (userType === 'seller') {
            const { products } = req.body;

            const sellerId = userId;
            const existingCatalog = await Catalog.findOne({ seller: sellerId });

            if (existingCatalog) {
                return res.status(409).json({ message: 'Catalog already exists for this seller' });
            }

            if (!Array.isArray(products) || !products.every(item => typeof item === 'object')) {
                return res.status(400).json({ message: 'Invalid products array in the request' });
            }


            const productIds = [];


            for (const product of products) {
                const newProduct = new Product(product);
                await newProduct.save();
                productIds.push(newProduct._id);
            }

            const catalog = new Catalog({ seller: sellerId, products: productIds });
            await catalog.save();

            res.status(201).json({ message: 'Catalog created successfully' });
        } else {
            res.status(403).json({ message: 'Unauthorized access' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

