import express from 'express';
import 'dotenv/config';

import upload from '../middleware/upload.js';

import {
    addProduct,
    getAllProducts,
    getFeaturedProducts,
    getNewProducts,
    getProductByPlatform,
    uploadImages
} from '../controllers/productController.js';

const PORT = process.env.PORT;

const router = express.Router();

router.post('/add-product', addProduct);
router.get('/all-products', getAllProducts);
router.get('/featured-products', getFeaturedProducts);
router.get('/new-products', getNewProducts);
router.get('/related-products/:platform', getProductByPlatform);

// Upload ảnh
router.post('/upload', upload.array('product'), uploadImages);

export default router;