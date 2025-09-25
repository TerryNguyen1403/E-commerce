import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }],
    total: {
        type: Number,
        default: 0
    },
    appliedVoucher: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;