import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Thêm sản phẩm vào giỏ hàng
export const addProductToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id; // JWT payload uses `id`

        let cart = await Cart.findOne({ userId: userId });

        // Tạo giỏ hàng nếu ko tồn tại
        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        }

        // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
        const existingItem = cart.items.find(
            (item) => item.productId?.toString() === String(productId)
        )

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                productId,
                quantity: 1
            })
        }

        await cart.save();
        res.status(200).json({
            success: true,
            message: "Thêm sản phẩm vào giỏ hàng thành công",
            cartData: cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Thêm sản phẩm vào giỏ hàng thất bại"
        })
    }
}

// Lấy dữ liệu giỏ hàng
export const getCartData = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId});

        if (!cart) {
            return res.status(200).json({});
        }

        const cartData = {};
        cart.items.forEach(item => {
            cartData[item.productId] = item.quantity;
        });

        res.status(200).json(cartData);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lấy dữ liệu giỏ hàng thất bại"
        })
    }
}