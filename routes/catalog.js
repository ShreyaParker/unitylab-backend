import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Catalog from '../models/Catalog.js'; // Import the Catalog model

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

            const catalog = new Catalog({ seller: sellerId, products });
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
