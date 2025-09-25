import express from 'express';
const router = express.Router();

import { verifyToken } from '../middleware/authUser.js';
import { addProductToCart, getCartData } from '../controllers/cartController.js';

router.post('/add-to-cart', verifyToken, addProductToCart);
router.get('/get-cart-data', verifyToken, getCartData);

export default router;