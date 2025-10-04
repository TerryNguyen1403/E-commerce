import express from 'express';
const router = express.Router();

import { verifyToken } from '../middleware/authUser.js';
import { addProductToCart, getCartData, updateQuantity } from '../controllers/cartController.js';

router.post('/add-to-cart', verifyToken, addProductToCart);
router.get('/get-cart-data', verifyToken, getCartData);
router.put('/update-quantity', verifyToken, updateQuantity);

export default router;