import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    platform: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamp: true });

const Product = mongoose.model('Product', productSchema);

export default Product;